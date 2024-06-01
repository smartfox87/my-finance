import { Dictionary } from "../../support/types";

describe("authorized accounts page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.login();
      cy.getLang().then((lang) => cy.visit(`/${lang}/accounts`));
      cy.intercept("GET", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("get-accounts");
    });

    it("should create account", () => {
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("create-account");
      cy.get('[data-cy="add-account-modal-btm"]').click();
      cy.pickCalculator("1000+1000");
      cy.get('[data-cy="add-account-form"]').within(() => {
        cy.get("#balance").as("balance").should("have.value", "2000").clear();
        cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
        cy.get("#name").type("test account");
        cy.get("@balance").type("1000");
        cy.get("@submit-btn").click();
      });
      cy.wait("@create-account").then((interception) => {
        expect(interception.response?.statusCode).to.eq(201);
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.account.create);
        });
      });
    });

    it("should update account", () => {
      cy.intercept("PATCH", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("update-account");
      cy.wait("@get-accounts").then((interception) => {
        cy.get('[data-cy="account-item"]').last().click();
        cy.get('[data-cy="edit-account-form"]').within(() => {
          cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
          cy.pickCalculator("1000+1000");
          cy.get("#balance").as("balance").should("have.value", "2000").clear();
          cy.get("#name").clear().type("test account 2");
          cy.get("@balance").type("3000");
          cy.get("@submit-btn").click();
        });
        cy.wait("@update-account").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.account.update);
          });
        });
      });
    });

    it("should transfer between accounts", () => {
      cy.intercept("PATCH", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("update-account");
      cy.wait("@get-accounts").then((interception) => {
        cy.get('[data-cy="transfer-between-accounts-btn"]').click();
        cy.get('[data-cy="transfer-between-accounts-form"]').within(() => {
          cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
          cy.pickSelect("#from", -1);
          cy.pickSelect("#to", -2);
          cy.pickCalculator("1000+1000");
          cy.get("#amount").as("amount").should("have.value", "2000").clear();
          cy.get("@amount").type("100");
          cy.get("@submit-btn").click();
        });
        cy.wait("@update-account").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.account.money_transfer);
          });
        });
      });
    });

    it("should delete account", () => {
      cy.intercept("DELETE", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("delete-account");
      cy.wait("@get-accounts").then((interception) => {
        cy.get('[data-cy="account-item"]').last().click();
        cy.get('[data-cy="delete-account-btn"]').last().click();
        cy.wait("@delete-account").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.account.delete);
          });
        });
      });
    });
  });
});
