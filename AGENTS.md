# Tax Cal 2026

Finnomena's Thai personal income tax calculator, the 2026 rework of the one live on prod.
Nuxt 4, Vue 3 `<script setup>`, Pinia, Tailwind. One page: `/tax/calculator`.

## Sources of truth
- Live prod (the baseline every change is compared to): https://www.finnomena.com/tax/%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5
- Background: https://finnomena.atlassian.net/wiki/spaces/NEXT/pages/3112438204/Tax+Calculator+2026
- Feature breakdown: https://finnomena.atlassian.net/wiki/spaces/NEXT/pages/3210644572/Tax+Cal+2026
- Epic NEXT-6533. Read Confluence and Jira through the Atlassian MCP, not the browser.
- Current work and Ford's decisions so far: `HANDOFF-tax-cal-2026-ux.md`

## Run it
- Node 24 only; Node 26 hangs on the Nuxt splash. `.npmrc` pins it for pnpm, and the `dev` script goes through pnpm, so `npm run dev` (what Ford types) and `pnpm dev` both get Node 24. Never run `npx nuxt` or `node …/nuxt.mjs`: they skip the pin.
- The splash hang is in the browser. `curl` still gets 200 from a hung server, so it proves nothing; use `scripts/check-ui`.
- One dev server per folder. A second `nuxt dev` here rewrites `.nuxt` and breaks the first, including Ford's on port 3000. Check the running one on 3000 instead of starting another; if you must start one, stop it when done.
- Export `CONTENT_URL` and `HEADER_VERSION` from `.exmaple.env` first.
- Open http://localhost:3000/tax/calculator
- No tests, lint, or typecheck scripts. The check for UI changes, with the dev server running:
  `cd scripts/check-ui && pnpm install && pnpm check` (pass a URL to check another port).
  It fails on the splash hang, a summary that jumps while typing, or a column that shifts between steps, and saves screenshots of every step.

## Map
- `pages/calculator.vue` → `components/TaxCalculator.vue` holds the step flow and swaps the step component.
- Steps: `IncomeForm` → `DeductionsForm` → `AdditionalDeductionsForm`, then the result page `TaxResult`.
- `TaxResult` = `TaxResultSlip` (the summary slip) + `TaxPlanningResult` (the RMF/ThaiESG upsell, with `RecommendedTaxFunds` and `RmfComboAllocateModal`).
- `TaxSummary` is the floating result panel shown beside the steps.
- Tax math and shared state: `composables/useTaxCalculator.ts`.
- Every interactive element has a `data-test-id` (`{page}__{component}--{action}`). Adding or renaming one means updating `TEST_DATA_IDS.md` and `DATA_TEST_IDS_LIST.txt` too.

## Domain
- RMF and ThaiESG are our upsell, not user input. ThaiESG and ThaiESGX are different funds.
- The steps and the floating panel show the same numbers. A change to one affects the other.

## Working with Ford (UX/UI, owns this repo)
- A short or ambiguous instruction: restate it in one line ("I read this as X") before acting. A clear one: just do it.
- An instruction already given is a go. Finish it without asking "start now?".
- When a new request arrives while work is pending, say what is still pending, then come back and finish it. Background agent results are pending work, not a status.
- Take Ford's words literally. A metaphor is not a spec.
- Scope by user flow, not by ticket. A change to one step affects the steps around it.
- Grill for one short round at most, then prototype. Ford judges by eye.
- Build variants for every surface the change touches, all together.
- Do UI and prototype work in the main session. A worker cannot see the screenshots or the conversation.
- No notes during the work. Write the spec after the decision.
- Before showing any UI change, run `scripts/check-ui` and look at its screenshots, then check them against Ford's own words.
- Talk in Thai.
