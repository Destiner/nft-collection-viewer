describe('Collection page', () => {
  beforeEach(() => cy.visit('/azuki'));

  it('default page is zero', () => {
    cy.get('[data-testid="page-label"]').contains('1');
  });

  it('page query param updates the displayed page', () => {
    const page = 5;
    cy.visit(`/azuki?page=${page}`);
    cy.get('[data-testid="page-label"]').contains(page);
  });

  it('pagination updates the route', () => {
    cy.get('[data-testid="page-right"]').click();
    cy.url().should('contain', 'page=2');
  });
});
