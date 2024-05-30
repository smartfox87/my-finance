import { Dictionary } from "../../support/types";

describe("authorized budgets page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.login();
      cy.getLang().then((lang) => cy.visit(`/${lang}/budgets`));
      cy.intercept("GET", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/budgets*`).as("get-budgets");
    });

    it("should be visible empty budgets", () => {
      cy.get('[data-cy="empty-budgets"]').should("be.visible");
    });

    it("should create budget", () => {
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/budgets*`).as("create-budget");
      cy.get('[gata-cy="add-budget-modal-btm"]').click();
      cy.get('[gata-cy="add-budget-form"]').within(() => {
        cy.get("#name").type("test budget");
        cy.get("#amount").type("1000");
        cy.pickMultiSelect("#accounts", { count: 2 });
        cy.pickMultiSelect("#categories", { count: 2 });
        cy.pickPeriod("#period");
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@create-budget").then((interception) => {
        expect(interception.response?.statusCode).to.eq(201);
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.budget.create);
          cy.get('[data-cy="empty-budgets"]').should("not.exist");
        });
      });
    });

    it("should update budget", () => {
      cy.intercept("PATCH", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/budgets*`).as("update-budget");
      cy.wait("@get-budgets").then((interception) => {
        cy.get('[data-cy="budget-item"]').last().click();
        cy.get('[gata-cy="edit-budget-form"]').within(() => {
          cy.get("#name").type("test budget");
          cy.get("#amount").type("1000");
          cy.pickMultiSelect("#accounts", { count: 2 });
          cy.pickMultiSelect("#categories", { count: 2 });
          cy.pickPeriod("#period");
          cy.get('button[type="submit"]').click();
        });
        cy.wait("@update-budget").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.budget.update);
          });
        });
      });
    });

    it("should delete budget", () => {
      cy.intercept("DELETE", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/budgets*`).as("delete-budget");
      cy.wait("@get-budgets").then((interception) => {
        cy.get('[data-cy="budget-item"]').last().click();
        cy.get('[data-cy="delete-budget-btn"]').last().click();
        cy.wait("@delete-budget").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.budget.delete);
            cy.get('[data-cy="empty-budgets"]').should("be.visible");
          });
        });
      });
    });
  });
});
