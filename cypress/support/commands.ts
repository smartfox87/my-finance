/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getLang", () => {
  cy.window().then((win) => {
    const lang = (win.navigator.language || win.navigator.languages[0]).substring(0, 2);
    return cy.wrap(lang);
  });
});

Cypress.Commands.add("getDictionary", () => {
  cy.window().then((win) => {
    cy.getLang().then((lang) => {
      cy.fixture(`locales/${lang}/default.json`).then((json) => {
        if (!json) throw new Error(`Could not load dictionary for language: ${lang}`);
        return cy.wrap(json);
      });
    });
  });
});

Cypress.Commands.add("pickSelect", (id) => {
  cy.get(`#${id}`).closest(".ant-select").click();
  cy.get(".ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item").then((options) => {
    const index = Math.floor(Math.random() * options.length);
    cy.wrap(options).eq(index).click();
  });
});

declare namespace Cypress {
  interface Chainable {
    // login(email: string, password: string): Chainable<void>
    // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    getDictionary(): Chainable;
    getLang(): Chainable;
    pickSelect(id: string): Chainable;
  }
}
