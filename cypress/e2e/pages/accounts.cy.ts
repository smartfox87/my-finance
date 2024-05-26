import { Dictionary } from "../../support/types";

describe("authorized accounts page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.login();
      cy.getLang().then((lang) => cy.visit(`/${lang}/accounts`));
    });

    it("should create account", () => {
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("create-account");
      cy.get('[gata-cy="add-account-modal-btm"]').click();
      cy.get('[gata-cy="add-account-form"]').within(() => {
        cy.get("#name").type("test account");
        cy.get("#balance").type("1000");
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@create-account").then((interception) => {
        expect(interception.response?.statusCode).to.eq(201);
        expect(interception.response?.body.id).to.be.a("number");
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.account.create);
        });
      });
    });

    it("should update account", () => {
      cy.intercept("PATCH", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("update-account");
      cy.get('[data-cy="account-item"]').last().click();
      cy.get('[gata-cy="edit-account-form"]').within(() => {
        cy.get("#name").clear().type("test account 2");
        cy.get("#balance").clear().type("2000");
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@update-account").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.id).to.be.a("number");
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.account.update);
        });
      });
    });

    it("should transfer between accounts", () => {
      cy.intercept("PATCH", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("update-account");
      cy.get('[gata-cy="transfer-between-accounts-btn"]').click();
      cy.get('[gata-cy="transfer-between-accounts-form"]').within(() => {
        cy.pickSelect("#from", -1);
        cy.pickSelect("#to", 0);
        cy.get("#amount").clear().type("100");
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@update-account").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.id).to.be.a("number");
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.account.money_transfer);
        });
      });
    });

    it("should delete account", () => {
      cy.intercept("DELETE", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("delete-account");
      cy.get('[data-cy="account-item"]').last().click();
      cy.get('[data-cy="delete-account-btn"]').last().click();
      cy.wait("@delete-account").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.id).to.be.a("number");
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.account.delete);
        });
      });
    });
  });
});
