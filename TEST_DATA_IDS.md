## Data Test IDs

This project standardizes testing hooks using the attribute `data-test-id` with the pattern:

```
{page}__{component}--{action/field}
```

Notes
- Use all lowercase with hyphens for multi-word segments.
- Prefer stable, semantic names. Dynamic parts may use identifiers like `-{index}` when necessary.

### Current IDs

Page: `tax-calculator`

Component: `deductions-form` (step 2)
- Actions: `tax-calculator__deductions-form--savings-investment-max-button`
- Sections: `tax-calculator__deductions-form--{family|savings-investment|other}-section` / `-title`
- Amount fields (`-container`, `-label`, `-input`, `-info`): `personal-deduction`, `maternity-expense`, `social-security`, `provident-fund`, `thai-esgx-transferred` (amount of LTF switched), `other-deduction`
- Yes/no field (`-container`, `-label`, `-input`): `spouse`
- Count fields (`-container`, `-label`, `-info`, `-decrease`, `-value`, `-increase`): `children-born-before-2561-count`, `children-born-from-2561-count`, `own-parents-count`, `spouse-parents-count`, `disabled-dependents-count`
- Family subtotal: `tax-calculator__deductions-form--family-total`

Component: `additional-deductions-form` (step 3)
- Header: `tax-calculator__additional-deductions-form--section`, `--title`
- Amount fields (`-container`, `-label`, `-input`, `-info`): `lifeInsurance`, `healthInsurance`, `parentHealthInsurance`, `spouseLifeInsurance`, `homeLoanInterest`, `solarRooftop`, `artwork`, `socialEnterprise`, `doubleDonation`, `donation`, `partyDonation`
- Pickers: `tax-calculator__additional-deductions-form--{insurance|home-measures|donation}-picker`; per field `-chip` (opens the field) and `-deducted` (shown when a cap cuts the entry)

Component: `recommended-tax-funds`
- Tabs
  - `tax-calculator__recommended-tax-funds--tab-rmf`
  - `tax-calculator__recommended-tax-funds--tab-thaiesg`
- Subtabs
  - `tax-calculator__recommended-tax-funds--subtab-individual`
  - `tax-calculator__recommended-tax-funds--subtab-combo`
- Fund Recommend Items
  - ThaiESG fund (per fund): `tax-calculator__recommended-tax-funds--thaiesg-fund-{index}`
  - RMF individual fund (per fund): `tax-calculator__recommended-tax-funds--rmf-fund-{index}`
  - RMF combo fund (per combo fund): `tax-calculator__recommended-tax-funds--combo-fund-{fundIndex}`
- Actions
  - Select combo button (per combo): `tax-calculator__recommended-tax-funds--select-combo-{comboIndex}`

Component: `rmf-combo-allocate-modal`
- Fields
  - Amount input: `tax-calculator__rmf-combo-allocate-modal--amount`
- Quick-fill actions
  - `tax-calculator__rmf-combo-allocate-modal--quick-500`
  - `tax-calculator__rmf-combo-allocate-modal--quick-1000`
  - `tax-calculator__rmf-combo-allocate-modal--quick-10000`
  - `tax-calculator__rmf-combo-allocate-modal--quick-100000`
- Footer actions
  - Cancel: `tax-calculator__rmf-combo-allocate-modal--cancel`
  - Confirm: `tax-calculator__rmf-combo-allocate-modal--confirm`

Component: `tax-result-slip` (result page summary)
- Result: `tax-calculator__tax-result-slip--status`, `tax-calculator__tax-result-slip--amount`, `tax-calculator__tax-result-slip--tax-rate-value`
- Facts: `tax-calculator__tax-result-slip--total-income`, `tax-calculator__tax-result-slip--total-deductions`, `tax-calculator__tax-result-slip--taxable-income`
- Result emoji: `tax-calculator__tax-result-slip--emoji`
- Deduction usage hint (prototype): `tax-calculator__tax-result-slip--usage-hint`, `tax-calculator__tax-summary--usage-hint`
- Summary panel emoji (prototype): `tax-calculator__tax-summary--emoji`
- Emoji rule picker (prototype, ?emoji=): `tax-calculator__result-emoji-variant-picker--{container,ticket,usage,usage-hint}`
- Full calculation toggle: `tax-calculator__tax-result-slip--breakdown-toggle`
- Full list: see `DATA_TEST_IDS_LIST.txt`

Component: `login-nudge` (guests only: above the stepper on steps 1–3, and on the result page)
- `tax-calculator__login-nudge--container`, `--login-button`, `--dismiss` (steps only)

Component: `header-content`
- Result page "แก้ไขข้อมูล" (back to step 3): `tax-calculator__header-content--edit-link`

Component: `tax-planning-result` (RMF/ThaiESG upsell on the result page)
- Planning card (replaces the savings line): see `tax-planning-card`

Component: `tax-planning-card` (moved from the floating panel to the result page upsell)
- Container: `tax-calculator__tax-planning-card--container`
- Savings amount: `tax-calculator__tax-planning-card--tax-savings-amount`
- Full list: see `DATA_TEST_IDS_LIST.txt`

### Usage examples (Cypress)

```javascript
// switch to RMF tab
cy.get('[data-test-id="tax-calculator__recommended-tax-funds--tab-rmf"]').click()

// click on an individual RMF fund (first fund at index 0)
cy.get('[data-test-id="tax-calculator__recommended-tax-funds--rmf-fund-0"]').click()

// click on a ThaiESG fund (first fund at index 0)
cy.get('[data-test-id="tax-calculator__recommended-tax-funds--thaiesg-fund-0"]').click()

// click on a combo fund (first combo's first fund)
cy.get('[data-test-id="tax-calculator__recommended-tax-funds--combo-fund-0"]').click()

// open allocation modal for a specific combo (first combo at index 0)
cy.get('[data-test-id="tax-calculator__recommended-tax-funds--select-combo-0"]').click()

// enter amount and confirm
cy.get('[data-test-id="tax-calculator__rmf-combo-allocate-modal--amount"]').type('10000')
cy.get('[data-test-id="tax-calculator__rmf-combo-allocate-modal--confirm"]').click()
```

### Adding new IDs
1. Identify the page and component where the element lives
2. Choose `action` or `field` describing the element purpose
3. Add the attribute: `data-test-id="{page}__{component–name-with-dash}--{action/field}"`


