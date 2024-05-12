import { DictionaryResponse } from "../support/commands";

type Page = "accounts" | "incomes" | "expenses" | "budgets" | "statistics" | "profile" | "settings";
const pages: Page[] = ["accounts", "incomes", "expenses", "budgets", "statistics", "profile", "settings"];

describe("Navigation", () => {
  it("should navigate to the home page", () => {
    cy.getDictionary().then(({ dictionary, lang }: DictionaryResponse) => {
      cy.visit(`/${lang}/`);
      cy.get('[data-cy="title"]').contains(dictionary.pages.home.title);
      cy.get('[data-cy="description"]').contains(dictionary.pages.home.description);
      cy.get('[data-cy="demo-auth"]').contains(dictionary.buttons.sign_in_demo_user);
    });
  });

  pages.forEach((page) => {
    it(`should navigate to the ${page} page`, () => {
      cy.getDictionary().then(({ dictionary }: DictionaryResponse) => {
        cy.viewport(1920, 1080);
        cy.visit("/"); // Заходим на главную страницу для перехода по ссылке
        cy.get(`a[href*="/${page}"]`).first().click();
        cy.url().should("include", `/${page}`); // Проверяем, что URL содержит /{page}
        cy.get('[data-cy="title"]').contains(dictionary.pages[page].title);
        cy.get('[data-cy="description"]').contains(dictionary.pages[page].description);
        cy.get('[data-cy="demo-auth"]').contains(dictionary.buttons.sign_in_demo_user);
      });
    });
  });

  it("should navigate to the contact page", () => {
    cy.getDictionary().then(({ dictionary }: DictionaryResponse) => {
      cy.viewport(1920, 1080);
      cy.visit("/");
      cy.get('a[href*="/contact"]').first().click();
      cy.url().should("include", "/contact");
      cy.get('[data-cy="title"]').contains(dictionary.pages.contact.title);
      cy.get('[data-cy="description"]').contains(dictionary.pages.contact.description);
    });
  });
});
