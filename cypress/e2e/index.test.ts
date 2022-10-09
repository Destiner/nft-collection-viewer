describe('Index page', () => {
  beforeEach(() => cy.visit('/'));

  it('redirect to default collection', () => {
    cy.url().should('contain', '/azuki');
  });

  // TODO invalid collection redirects to 404
  // TODO invalid token id redirects to 404
});
