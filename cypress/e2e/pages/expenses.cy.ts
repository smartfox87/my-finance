import { Dictionary } from "../../support/types";

describe("authorized expenses page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.login();
      cy.getLang().then((lang) => cy.visit(`/${lang}/expenses`));
      cy.intercept("GET", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/costs*`).as("get-expenses");
    });

    it("should be visible empty expenses", () => {
      cy.get('[data-cy="empty-expenses"]').should("be.visible");
    });

    it("should create expense", () => {
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/costs*`).as("create-expense");
      cy.get('[data-cy="add-expense-modal-btm"]').click();
      cy.get('[data-cy="add-expense-form"]').within(() => {
        cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
        cy.get("#name").type("test expense");
        cy.get("#amount").type("1000");
        cy.pickSelect("#account", 0);
        cy.pickSelect("#category", 0);
        cy.pickDate("#date");
        cy.get("@submit-btn").click();
      });
      cy.wait("@create-expense").then((interception) => {
        expect(interception.response?.statusCode).to.eq(201);
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.expense.create);
          cy.get('[data-cy="empty-expenses"]').should("not.exist");
        });
      });
    });

    it("should update expense", () => {
      cy.intercept("PATCH", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/costs*`).as("update-expense");
      cy.wait("@get-expenses").then((interception) => {
        cy.get('[data-cy="expense-item"]').last().click();
        cy.get('[data-cy="edit-expense-form"]').within(() => {
          cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
          cy.get("#name").type("test expense");
          cy.get("#amount").type("1000");
          cy.pickSelect("#account", 0);
          cy.pickSelect("#category", 0);
          cy.pickDate("#date");
          cy.get("@submit-btn").click();
        });
        cy.wait("@update-expense").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.expense.update);
          });
        });
      });
    });

    it("should delete expense", () => {
      cy.intercept("DELETE", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/costs*`).as("delete-expense");
      cy.wait("@get-expenses").then((interception) => {
        cy.get('[data-cy="expense-item"]').last().click();
        cy.get('[data-cy="delete-expense-btn"]').last().click();
        cy.wait("@delete-expense").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.expense.delete);
            cy.get('[data-cy="empty-expenses"]').should("be.visible");
          });
        });
      });
    });
  });
});
