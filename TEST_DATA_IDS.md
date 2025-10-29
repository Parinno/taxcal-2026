## Data Test IDs

This project standardizes testing hooks using the attribute `data-test-id` with the pattern:

```
{page}__{component}--{action/field}
```

Notes
- Use all lowercase with hyphens for multi-word segments.
- Prefer stable, semantic names. Dynamic parts may use identifiers like `-{comboId}` when necessary.

### Current IDs

Page: `tax-calculator`

Component: `RecommendedTaxFunds`
- Tabs
  - `tax-calculator__RecommendedTaxFunds--tab-rmf`
  - `tax-calculator__RecommendedTaxFunds--tab-thaiesg`
- Subtabs
  - `tax-calculator__RecommendedTaxFunds--subtab-individual`
  - `tax-calculator__RecommendedTaxFunds--subtab-combo`
- Actions
  - Select combo button (per combo): `tax-calculator__RecommendedTaxFunds--select-combo-{comboId}`

Component: `RmfComboAllocateModal`
- Fields
  - Amount input: `tax-calculator__RmfComboAllocateModal--amount`
- Quick-fill actions
  - `tax-calculator__RmfComboAllocateModal--quick-500`
  - `tax-calculator__RmfComboAllocateModal--quick-1000`
  - `tax-calculator__RmfComboAllocateModal--quick-10000`
  - `tax-calculator__RmfComboAllocateModal--quick-100000`
- Footer actions
  - Cancel: `tax-calculator__RmfComboAllocateModal--cancel`
  - Confirm: `tax-calculator__RmfComboAllocateModal--confirm`

### Usage examples (Cypress)

```javascript
// switch to RMF tab
cy.get('[data-test-id="tax-calculator__RecommendedTaxFunds--tab-rmf"]').click()

// open allocation modal for a specific combo
cy.get('[data-test-id="tax-calculator__RecommendedTaxFunds--select-combo-42"]').click()

// enter amount and confirm
cy.get('[data-test-id="tax-calculator__RmfComboAllocateModal--amount"]').type('10000')
cy.get('[data-test-id="tax-calculator__RmfComboAllocateModal--confirm"]').click()
```

### Adding new IDs
1. Identify the page and component where the element lives
2. Choose `action` or `field` describing the element purpose
3. Add the attribute: `data-test-id="{page}__{component}--{action/field}"`


