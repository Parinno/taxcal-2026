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


