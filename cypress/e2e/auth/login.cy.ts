describe("Login form", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit(`/`);
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/token?grant_type=password`).as("login");
    });

    it("should login", () => {
      cy.get('[data-cy="login-btn"]').click();
      cy.get('[data-cy="login-form"]').within(() => {
        cy.get("#email").type(Cypress.env("E2E_LOGIN"));
        cy.get("#password").type(Cypress.env("E2E_PASSWORD"));
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@login").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.access_token).to.be.a("string");
        expect(interception.response?.body.user).to.be.an("object");
      });
    });
  });
});
