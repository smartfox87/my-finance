import { Dictionary } from "../../support/types";
import { faker } from "@faker-js/faker";

describe("Contact form", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.getLang().then((lang) => cy.visit(`/${lang}/contact`));
      cy.intercept("POST", "/api/contact").as("contact");
    });

    it("should send contact message", () => {
      cy.get("form").within(() => {
        cy.get('button[type="submit"]').as("submit-btn").should("be.disabled");
        cy.get("#full_name").type(faker.person.fullName());
        cy.get("#email").type("test@gmail.com");
        cy.pickSelect("#subject");
        cy.get("#message").type("test message");
        cy.pickFile("#files");
        cy.get("@submit-btn").click();
      });
      cy.wait("@contact").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.success).to.be.true;
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.contact.success);
        });
      });
    });
  });
});
