import { Dictionary } from "../../support/types";

describe("authorized incomes page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.login();
      cy.getLang().then((lang) => cy.visit(`/${lang}/incomes`));
      cy.intercept("GET", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/incomes*`).as("get-incomes");
    });

    it("should be visible empty incomes", () => {
      cy.get('[data-cy="empty-incomes"]').should("be.visible");
    });

    it("should create income", () => {
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/incomes*`).as("create-income");
      cy.get('[data-cy="add-income-modal-btm"]').click();
      cy.get('[data-cy="add-income-form"]').within(() => {
        cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
        cy.get("#name").type("test income");
        cy.get("#amount").type("1000");
        cy.pickSelect("#account", 0);
        cy.pickSelect("#category", 0);
        cy.pickDate("#date");
        cy.get("@submit-btn").click();
      });
      cy.wait("@create-income").then((interception) => {
        expect(interception.response?.statusCode).to.eq(201);
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.income.create);
          cy.get('[data-cy="empty-incomes"]').should("not.exist");
        });
      });
    });

    it("should update income", () => {
      cy.intercept("PATCH", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/incomes*`).as("update-income");
      cy.wait("@get-incomes").then((interception) => {
        cy.get('[data-cy="income-item"]').last().click();
        cy.get('[data-cy="edit-income-form"]').within(() => {
          cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
          cy.get("#name").type("test income");
          cy.get("#amount").type("1000");
          cy.pickSelect("#account", 0);
          cy.pickSelect("#category", 0);
          cy.pickDate("#date");
          cy.get("@submit-btn").click();
        });
        cy.wait("@update-income").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.income.update);
          });
        });
      });
    });

    it("should delete income", () => {
      cy.intercept("DELETE", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/incomes*`).as("delete-income");
      cy.wait("@get-incomes").then((interception) => {
        cy.get('[data-cy="income-item"]').last().click();
        cy.get('[data-cy="delete-income-btn"]').last().click();
        cy.wait("@delete-income").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.income.delete);
            cy.get('[data-cy="empty-incomes"]').should("be.visible");
          });
        });
      });
    });
  });
});
