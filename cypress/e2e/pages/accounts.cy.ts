import { Dictionary } from "../../support/types";

describe("authorized accounts page", () => {
  context("1920x1080 resolution", () => {
    before(() => {
      cy.login();
    });

    beforeEach(() => {
      cy.getLang().then((lang) => cy.visit(`/${lang}/accounts`));
    });

    it("should add account", () => {
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/accounts*`).as("new-account");
      cy.get('[gata-cy="add-account-modal-btm"]').click();
      cy.get('[gata-cy="add-account-form"]').within(() => {
        cy.get("#name").type("test account");
        cy.get("#balance").type("1000");
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@new-account").then((interception) => {
        expect(interception.response?.statusCode).to.eq(201);
        expect(interception.response?.body.id).to.be.a("number");
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.account.create);
        });
      });
    });
  });
});
