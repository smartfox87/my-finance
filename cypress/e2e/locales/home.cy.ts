import { Dictionary, Locales, Page, Pages } from "../../support/types";

const pages: Page[] = Object.values(Pages).filter((page) => page !== Pages.HOME && page !== Pages.CONTACT);

describe("Unauthorized pages", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });

    it("should change locales at the home page", () => {
      cy.visit(`/`);
      Object.values(Locales).forEach((locale) => {
        cy.pickSiteLocale(locale);
        cy.url().should("eq", `${Cypress.config().baseUrl}/${locale === Locales.EN ? "" : locale}`);
        cy.getDictionary(locale).then((dictionary: Dictionary) => {
          cy.get('[data-cy="title"]').contains(dictionary.pages.home.title);
          cy.get('[data-cy="description"]').contains(dictionary.pages.home.description);
          cy.get('[data-cy="demo-login-btn"]').contains(dictionary.buttons.sign_in_demo_user);
        });
      });
    });
  });
});
