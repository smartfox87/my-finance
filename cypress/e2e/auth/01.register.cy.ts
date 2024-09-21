import { faker } from "@faker-js/faker";

describe("Register form", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit(`/`);
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/signup*`).as("register");
    });

    it("should register", () => {
      cy.deleteE2EUser();
      cy.get('[data-cy="register-btn"]').click();
      cy.get('[data-cy="register-form"]').within(() => {
        cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
        cy.get("#full_name").type(faker.person.fullName());
        cy.get("#email").type(Cypress.env("E2E_LOGIN"));
        cy.get("#password").type(Cypress.env("E2E_PASSWORD"));
        cy.get("@submit-btn").click();
      });
      cy.wait("@register").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.access_token).to.be.a("string");
        expect(interception.response?.body.user).to.be.an("object");
        cy.wait(2000).isHomePage();
      });
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-6");
      cy.visit(`/`);
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/signup*`).as("register");
    });

    it("should register", () => {
      cy.deleteE2EUser();
      cy.get('[data-cy="mobile-menu-btn"]').click();
      cy.get('[data-cy="register-btn"]').click();
      cy.get('[data-cy="register-form"]').within(() => {
        cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
        cy.get("#full_name").type(faker.person.fullName());
        cy.get("#email").type(Cypress.env("E2E_LOGIN"));
        cy.get("#password").type(Cypress.env("E2E_PASSWORD"));
        cy.get("@submit-btn").click();
      });
      cy.wait("@register").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.access_token).to.be.a("string");
        expect(interception.response?.body.user).to.be.an("object");
        cy.wait(2000).isHomePage();
      });
    });
  });
});
