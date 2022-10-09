describe('Index page', () => {
  beforeEach(() => cy.visit('/'));

  it('redirect to default collection', () => {
    cy.url().should('contain', '/azuki');
  });
});
