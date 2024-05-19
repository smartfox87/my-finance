import { Dictionary } from "../../support/types";

describe("Register form", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.getLang().then((lang) => cy.visit(`/${lang}`));
      cy.intercept("POST", "/api/contact").as("sendMessage");
    });

    it("should register", () => {
      cy.get('[data-cy="register-btn"]').click();
      cy.get('[data-cy="register-form"]').within(() => {
        cy.get("#full_name").type("Full name");
        cy.get("#email").type("test@gmail.com");
        cy.get("#password").type("Pp25946123=");
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@sendMessage").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.success).to.be.true;
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.contact.success);
        });
      });
    });
  });
});
