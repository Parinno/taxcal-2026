# Tax Cal 2026 — UX handoff

Point the next session here. Only facts and Ford's own decisions, no proposals.
Last updated 2026-10-06.

## Sources
- Live prod: https://www.finnomena.com/tax/%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5
- Background (Confluence): https://finnomena.atlassian.net/wiki/spaces/NEXT/pages/3112438204/Tax+Calculator+2026
- Feature breakdown, hackathon (Confluence): https://finnomena.atlassian.net/wiki/spaces/NEXT/pages/3210644572/Tax+Cal+2026
- Epic NEXT-6533 · release ~2026-10-27
- Other prototypes: taxcal-2026.guny.dev (Gun, = this repo), taxcal.guny.dev (Jin)

## My role
Ford Parin, UX/UI. Spot UX issues per feature, propose what it should be.
Confluence says: "Validate UX/UI from delivery result instead of design first".

## Features (owner)
| Ticket | Feature | Owner | Status |
|---|---|---|---|
| NEXT-6738 | Show result along the way | Aome | **in real code, uncommitted** |
| NEXT-6654 | Updated deduction | Bell | not started |
| NEXT-6742 | Max deduction prefill | Zai | not started |
| NEXT-6740 | Tax suggestion | Big | not started |
| NEXT-6741 | Result emoji | Aome | not started |
| NEXT-6739 | Share social template | Aome | not started |
| NEXT-6734 | Register/Login to save | Na | not started |
| NEXT-6743 | Save draft | Na | not started |

## The problem that started this
Step 4 repeats the same information as the floating summary panel, e.g. "ภาษีที่ได้รับคืน" shows several times on one screen (prod shows the result amount up to 7×).

## Ford's decisions on NEXT-6738
- Modeless: the result is visible the whole way from step 1, so users see it change and dare to try different inputs.
- The floating panel looks and updates like the current one. No flashing, no jumping, no extra animation.
- Empty state: keep the current one.
- The result is not step 4. The form is steps 1–2–3, then a result page.
- RMF/ThaiESG is our upsell, not user input, so it lives on the result page.
- "Spotify Wrapped" was only a metaphor for ending on a sum-up. There is no story or slides.
- Result page chosen: **ใบสรุป** (summary-slip card).
- Floating panel: **ปัจจุบัน** (current TaxSummary, unchanged), hidden on the result page.
- ThaiESGX and ThaiESG are different funds.

## Code state
- Repo: `/Users/parin/orca/workspaces/taxcal-2026/sauger`, branch `ux/result-along-the-way-proto`. Nothing committed or pushed.
- The prototype is deleted.
- Real code changes:
  - New: `TaxResult.vue`, `TaxResultSlip.vue`
  - `TaxPlanningResult.vue` is now the upsell section.
  - Also changed: `TaxCalculator.vue`, `HeaderContent.vue`, `StepIndicator.vue`, and the test-id lists.
- Left as is: RMF/ThaiESG still reset to 0 when leaving the result page.
- Run it:
  - Use Node 24 (`/usr/local/bin/node`); Node 26 hangs on the Nuxt splash.
  - Export `CONTENT_URL` and `HEADER_VERSION` from `.exmaple.env`.
  - Run `pnpm dev` and open `http://localhost:3000/tax/calculator`.

## Next
1. Ford reviews the real page, then commit.
2. Write the NEXT-6738 spec.
3. Next feature.

## How to work with Ford (learned the hard way)
- Take Ford's words literally. A metaphor is not a spec.
- Scope by user flow, not by ticket. A change to one step affects the steps around it.
- Grill for one short round at most, then prototype. Ford judges by eye.
- Build variants for every surface the change touches, all together.
- Before showing anything, check it against Ford's own words above.
- No notes during the work. Write the spec after the decision.
- Talk in Thai.
