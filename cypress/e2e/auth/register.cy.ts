import { Dictionary } from "../../support/types";

describe("Register form", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.getLang().then((lang) => cy.visit(`/${lang}`));
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/signup*`).as("register");
    });

    it("should register", () => {
      cy.deleteE2EUser();
      cy.get('[data-cy="register-btn"]').click();
      cy.get('[data-cy="register-form"]').within(() => {
        cy.get("#full_name").type("Full name");
        cy.get("#email").type(Cypress.env("E2E_LOGIN"));
        cy.get("#password").type(Cypress.env("E2E_PASSWORD"));
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@register").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.access_token).to.be.a("string");
        expect(interception.response?.body.user).to.be.an("object");
      });
    });
  });
});
