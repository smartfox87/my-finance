import { Dictionary } from "../support/types";

describe("Contact form", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.getLang().then((lang) => cy.visit(`/${lang}/contact`));
      cy.intercept("POST", "/api/contact").as("sendMessage");
    });

    it("should send contact message", () => {
      cy.get("form").within(($form) => {
        cy.get('input[id="full_name"]').type("Full name");
        cy.get('input[id="email"]').type("test@gmail.com");
        cy.pickSelect("subject");
        cy.get('textarea[id="message"]').type("test message");
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@sendMessage").then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.success).to.be.true;
        cy.getDictionary().then((dictionary: Dictionary) => {
          cy.get(".ant-notification-notice-message").contains(dictionary.notifications.contact.success);
        });
      });
    });
  });
});
