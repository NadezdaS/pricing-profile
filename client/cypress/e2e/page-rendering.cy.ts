describe('Product Filtering Flow', () => {
	beforeEach(() => {
		cy.visit('/pricing-profile');
	});

	it('renders Pricing Profile form and all sections', () => {
		cy.get('[data-cy="profile-title-section"]').should('exist');
		cy.get('[data-cy="profile-select-products-section"]').should('exist');
		cy.get('[data-cy="profile-price-adjustment-section"]').should('exist')
	});
});
