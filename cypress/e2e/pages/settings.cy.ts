import { Dictionary } from "../../support/types";
import { faker } from "@faker-js/faker";

describe("authorized settings page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.login();
      cy.getLang().then((lang) => cy.visit(`/${lang}/settings`));
      cy.intercept("GET", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/profile*`).as("get-profile");
    });

    it("should update profile", () => {
      cy.intercept("PATCH", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/profile*`).as("update-profile");
      cy.wait("@get-profile").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        cy.get('[gata-cy="edit-settings-form"]').within(() => {
          cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
          cy.pickSelect("#currency");
          cy.pickRadioButton("#period");
          cy.get("@submit-btn").click();
        });
        cy.wait("@update-profile").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.settings.update);
            cy.get("@submit-btn").should("be.disabled");
          });
        });
      });
    });
  });
});
