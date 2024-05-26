import { supabaseClient } from "./supabase";

Cypress.Commands.add("deleteE2EUser", () => {
  supabaseClient
    .from("profiles")
    .select("id")
    .eq("email", Cypress.env("E2E_LOGIN"))
    .maybeSingle()
    .then(({ data: user, error }) => {
      if (error) throw new Error(error.message);
      if (user) {
        return supabaseClient.auth.admin.deleteUser(user.id).then(({ error }) => {
          if (error) throw new Error(error.message);
        });
      }
    });
});

Cypress.Commands.add("getLang", () => {
  cy.window().then((win) => {
    const lang = (win.navigator.language || win.navigator.languages[0]).substring(0, 2);
    cy.wrap(lang);
  });
});

Cypress.Commands.add("login", () => {
  cy.session(
    "login",
    () => {
      cy.viewport(1920, 1080);
      cy.visit("/");
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/token?grant_type=password`).as("login");
      cy.get('[data-cy="modal-login-btn"]').click();
      cy.get('[data-cy="login-form"]').within(() => {
        cy.get("#email").type(Cypress.env("E2E_LOGIN"));
        cy.get("#password").type(Cypress.env("E2E_PASSWORD"));
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@login").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
      });
    },
    { cacheAcrossSpecs: true },
  );
});

Cypress.Commands.add("getDictionary", () => {
  cy.getLang().then((lang) => {
    cy.fixture(`locales/${lang}/default.json`).then((json) => {
      if (!json) throw new Error(`Could not load dictionary for language: ${lang}`);
      cy.wrap(json);
    });
  });
});

Cypress.Commands.add("pickSelect", (selector, index) => {
  cy.get(selector).closest(".ant-select").click();
  cy.get(".ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item").then((options) => {
    const optionsLength = options.length;
    if (!optionsLength) throw new Error("No selectable options found.");

    if (typeof index === "number") {
      if (index >= 0)
        cy.wrap(options)
          .eq(Math.min(index, optionsLength - 1))
          .scrollIntoView()
          .click();
      else cy.wrap(options).eq(Math.max(index, -optionsLength)).scrollIntoView().click();
    } else
      cy.wrap(options)
        .eq(Math.floor(Math.random() * optionsLength))
        .scrollIntoView()
        .click();
  });
});

Cypress.Commands.add("pickFile", (selector) => {
  cy.get(selector).selectFile("cypress/fixtures/images/jpg.jpg", { force: true, action: "select" });
});

// Declare namespace for custom Cypress commands
declare global {
  namespace Cypress {
    interface Chainable {
      deleteE2EUser(): Chainable<void>;
      login(): Chainable<void>;
      getLang(): Chainable<string>;
      getDictionary(): Chainable<any>;
      pickSelect(selector: string, index?: number): Chainable<void>;
      pickFile(selector: string): Chainable<void>;
    }
  }
}
