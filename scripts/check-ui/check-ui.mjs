// Checks the calculator for the UI problems Ford has rejected before:
//   1. the page never gets past the Nuxt splash (Node 26)
//   2. the floating summary jumps or flashes while the user types
//   3. the main column shifts sideways between steps 1–3
//   4. the result page column is not centered on the page
// It also saves a screenshot of every step for an eye check.
//
// Usage: pnpm check [url]   (default http://localhost:3000/tax/calculator)
// Exit code 1 when any check fails.

import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const url = process.argv[2] ?? 'http://localhost:3000/tax/calculator'
const outDir = new URL('./screenshots/', import.meta.url).pathname
mkdirSync(outDir, { recursive: true })

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
}
const id = (name) => `[data-test-id="tax-calculator__${name}"]`
const failures = []

const browser = await chromium.launch()
for (const [viewportName, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport })

  try {
    // Don't wait for the load event: with CONTENT_URL set, third-party header scripts hold it back for 30s+.
    // Step 1 rendering is the real sign the app got past the splash.
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 })
    await page.locator(id('tax-calculator--step-1-form')).waitFor({ timeout: 30_000 })
    // The server-rendered form shows before Vue takes over; typing earlier is lost when hydration resets the inputs
    await page.waitForFunction(() => {
      const nuxtApp = document.querySelector('#__nuxt')?.__vue_app__?.config.globalProperties.$nuxt
      return nuxtApp && !nuxtApp.isHydrating
    }, null, { timeout: 30_000 })
  } catch {
    failures.push(`${viewportName}: the page never loaded or step 1 never rendered (stuck on the splash?)`)
    await page.screenshot({ path: `${outDir}${viewportName}-stuck.png` })
    await page.close()
    continue
  }

  const summaryHeights = await recordSummaryHeightsWhileTyping(page, '600000')
  const heightChanges = countChanges(summaryHeights)
  // One change is expected: the empty state turns into a number.
  if (heightChanges > 1) {
    failures.push(`${viewportName}: summary height changed ${heightChanges} times while typing (${unique(summaryHeights).join(', ')}px)`)
  }

  const columnLeftByStep = []
  for (const step of ['step-1', 'step-2', 'step-3']) {
    columnLeftByStep.push(await leftEdge(page, id('tax-calculator--main-content')))
    await page.screenshot({ path: `${outDir}${viewportName}-${step}.png`, fullPage: true })
    await page.locator(id('tax-calculator--next-button')).click()
    await page.waitForTimeout(500)
  }
  if (unique(columnLeftByStep).length > 1) {
    failures.push(`${viewportName}: main column moved sideways between steps (left edge ${columnLeftByStep.join(' → ')}px)`)
  }

  // The result page has no floating summary, so its column sits in the middle of the page
  await page.locator(id('tax-calculator--step-4-form')).waitFor({ timeout: 5_000 })
  await page.screenshot({ path: `${outDir}${viewportName}-result.png`, fullPage: true })
  const offCenter = await distanceFromPageCenter(page, id('tax-calculator--main-content'))
  if (offCenter > 1) {
    failures.push(`${viewportName}: result page column is ${offCenter}px off the page center`)
  }

  await page.close()
}
await browser.close()

console.log(`Screenshots: ${outDir}`)
if (failures.length) {
  console.log('FAIL')
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exit(1)
}
console.log('PASS')

// Types one digit at a time and samples the summary height on every frame,
// so a height that flips and flips back within a keystroke is still caught.
async function recordSummaryHeightsWhileTyping(page, digits) {
  const summary = id('tax-calculator--tax-summary')
  if (!(await page.locator(summary).isVisible())) return []

  await page.evaluate((selector) => {
    window.__summaryHeights = []
    const sample = () => {
      const box = document.querySelector(selector)?.getBoundingClientRect()
      if (box) window.__summaryHeights.push(Math.round(box.height))
      window.__summaryFrame = requestAnimationFrame(sample)
    }
    sample()
  }, summary)

  const salary = page.locator(id('income-form--salary-input'))
  await salary.click()
  for (const digit of digits) {
    await salary.press(digit)
    await page.waitForTimeout(400)
  }

  return page.evaluate(() => {
    cancelAnimationFrame(window.__summaryFrame)
    return window.__summaryHeights
  })
}

async function leftEdge(page, selector) {
  const box = await page.locator(selector).boundingBox()
  return box ? Math.round(box.x) : null
}

async function distanceFromPageCenter(page, selector) {
  const box = await page.locator(selector).boundingBox()
  const pageWidth = await page.evaluate(() => document.documentElement.clientWidth)
  return Math.round(Math.abs(box.x + box.width / 2 - pageWidth / 2))
}

function countChanges(values) {
  return values.filter((value, index) => index > 0 && value !== values[index - 1]).length
}

function unique(values) {
  return [...new Set(values)]
}
