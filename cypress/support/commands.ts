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
        cy.get("#email").type(Cypress.env("E2E_LOGIN"), { force: true });
        cy.get("#password").type(Cypress.env("E2E_PASSWORD"), { force: true });
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
  cy.get(selector)
    .closest(".ant-select")
    .click()
    .within(() => {
      cy.get(".ant-select-item").then((options) => {
        const optionsLength = options.length;
        if (!optionsLength) throw new Error("No selectable options found.");

        if (typeof index === "number") {
          if (index >= 0)
            cy.wrap(options)
              .eq(Math.min(index, optionsLength - 1))
              .click({ force: true });
          else cy.wrap(options).eq(Math.max(index, -optionsLength)).click({ force: true });
        } else
          cy.wrap(options)
            .eq(Math.floor(Math.random() * optionsLength))
            .click({ force: true });
      });
    });
});

Cypress.Commands.add("pickMultiSelect", (selector, { indexes = null, count = null } = {}) => {
  cy.get(selector)
    .closest(".ant-select")
    .click()
    .within((select) => {
      cy.get(".ant-select-item").then((options) => {
        const optionsLength = options.length;
        if (!optionsLength) throw new Error("No selectable options found.");

        if (typeof count === "number") {
          const selectedIndexes: Set<number> = new Set();
          while (selectedIndexes.size < count) {
            const index = Math.floor(Math.random() * (optionsLength - 1)) + 1;
            selectedIndexes.add(index);
          }
          selectedIndexes.forEach((index) => {
            cy.wrap(options).eq(index).click({ force: true });
          });
        } else if (Array.isArray(indexes)) {
          Array.from(new Set(indexes)).forEach((index) => {
            const safeIndex = index >= 0 ? Math.min(index, optionsLength - 1) : Math.max(index + optionsLength, 0);
            if (safeIndex >= 0 && safeIndex < optionsLength) {
              cy.wrap(options).eq(safeIndex).click({ force: true });
            }
          });
        }
      });
      cy.wrap(select).parent().click(0, 0);
    });
});

Cypress.Commands.add("pickDate", (selector) => {
  cy.get(selector)
    .closest(".ant-picker")
    .click()
    .within(() => {
      cy.get(".ant-picker-cell-in-view").then((items) => {
        cy.wrap(items)
          .eq(Math.floor(Math.random() * items.length))
          .click();
      });
    });
});

Cypress.Commands.add("pickPeriod", (selector) => {
  cy.get(selector).within(() => {
    cy.get(".ant-radio-button-wrapper").then((items) => {
      cy.wrap(items)
        .eq(Math.floor(Math.random() * items.length))
        .click();
    });
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
      pickMultiSelect(selector: string, options: { indexes?: number[]; count?: number }): Chainable<void>;
      pickDate(selector: string): Chainable<void>;
      pickPeriod(selector: string): Chainable<void>;
      pickFile(selector: string): Chainable<void>;
    }
  }
}
