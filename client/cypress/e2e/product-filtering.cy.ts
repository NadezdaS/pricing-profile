describe('Product Filtering Flow', () => {
  beforeEach(() => {
    cy.visit('/pricing-profile');
  });

  it('filters products by category and sub-category', () => {
    cy.get('[data-cy="select-category"]').select('Seafood');
    cy.get('[data-cy="select-subcategory"]').select('Fish');
    cy.get('[data-cy="products-list"]').children().should('have.length.greaterThan', 0);
  });

  it('filters products by search term', () => {
    cy.get('[data-cy="search-field"]').type('Salmon');
    cy.get('[data-cy="products-list"]').contains('Salmon');
  });

  it('selects and deselects all products', () => {
    cy.get('[name="productToggle"]').eq(1).check(); // Select All
    cy.get('[data-cy^="product-checkbox-input-"]').each($el => {
      cy.wrap($el).should('be.checked');
    });

    cy.get('[name="productToggle"]').eq(0).check(); // Deselect All
    cy.get('[data-cy^="product-checkbox-input-"]').each($el => {
      cy.wrap($el).should('not.be.checked');
    });
  });

  it('allows inline editing of product adjustment', () => {
    cy.get('[data-cy="product-checkbox-input-0"]').check();
    cy.get('[data-cy="product-adjustments-table"]').find('tr').eq(1).contains('-$ 0').click();
    cy.focused().type('15');
    cy.get('body').click(0, 0); 
    cy.get('[data-cy="product-adjustments-table"]').find('tr').eq(1).contains('-$ 15');
  });
});
