describe('Redirects', () => {
  it('redirect to default collection', () => {
    cy.visit('/');
    cy.url().should('contain', '/azuki');
  });

  it('invalid collection redirects to 404', () => {
    cy.visit('/unsupported-collection', {
      failOnStatusCode: false,
    });
    cy.url().should('contain', '/404');
    cy.get('div').should('contain', '404');
  });

  it('invalid asset redirects to 404', () => {
    cy.visit('/azuki/abc', {
      failOnStatusCode: false,
    });
    cy.url().should('contain', '/404');
    cy.get('div').should('contain', '404');
  });
});
