import { Dictionary } from "../../support/types";
import { faker } from "@faker-js/faker";

describe("authorized profile page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.login();
      cy.getLang().then((lang) => cy.visit(`/${lang}/profile`));
      cy.intercept("GET", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/profile*`).as("get-profile");
    });

    it("should update profile", () => {
      cy.intercept("PATCH", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/profile*`).as("update-profile");
      cy.wait("@get-profile").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        cy.get('[data-cy="edit-profile-form"]').within(() => {
          cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
          cy.get("#full_name").should("have.value", interception.response?.body.full_name);
          cy.get("#full_name").clear({ force: true }).type(faker.person.fullName());
          cy.pickDate("#birthdate");
          cy.pickSelect("#gender");
          cy.get("@submit-btn").click();
        });
        cy.wait("@update-profile").then((interception) => {
          expect(interception.response?.statusCode).to.eq(200);
          cy.getDictionary().then((dictionary: Dictionary) => {
            cy.get(".ant-notification-notice-message").contains(dictionary.notifications.profile.update);
            cy.get("@submit-btn").should("be.disabled");
          });
        });
      });
    });
  });
});
