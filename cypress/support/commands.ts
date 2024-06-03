import { supabaseClient } from "./supabase";
import { SortItems, SortOrder, SortProp } from "./types";
import { sortItems } from "./utils";

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

Cypress.Commands.add("loginDemo", () => {
  cy.session(
    "loginDemo",
    () => {
      cy.viewport(1920, 1080);
      cy.visit("/");
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/token?grant_type=password`).as("login");
      cy.get('[data-cy="demo-login-btn"]').click();
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

Cypress.Commands.add("pickSelect", (selector, { index, returnValue } = {}) => {
  cy.get(selector)
    .closest(".ant-select")
    .click()
    .within(() => {
      cy.get(".ant-select-item").then((options) => {
        const optionsLength = options.length;
        if (!optionsLength) throw new Error("No selectable options found.");
        let resultIndex: number;

        if (typeof index === "number") {
          if (index >= 0) resultIndex = Math.min(index, optionsLength - 1);
          else resultIndex = Math.max(index, -optionsLength);
        } else resultIndex = Math.floor(Math.random() * optionsLength);

        cy.wrap(options).eq(resultIndex).click({ force: true });

        if (returnValue) cy.get(`${selector}_list_${resultIndex}`).then((value) => cy.wrap({ value: value.text() }).as("selectedValue"));
      });
    });
});

Cypress.Commands.add("pickMultiSelect", (selector, { indexes, indexesCount } = {}) => {
  cy.get(selector)
    .closest(".ant-select")
    .click()
    .within((select) => {
      cy.get(".ant-select-item").then((options) => {
        const optionsLength = options.length;
        if (!optionsLength) throw new Error("No selectable options found.");

        if (typeof indexesCount === "number") {
          const selectedIndexes: Set<number> = new Set();
          while (selectedIndexes.size < indexesCount) {
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

Cypress.Commands.add("pickRadioButton", (selector) => {
  cy.get(selector).within(() => {
    cy.get(".ant-radio-button-wrapper").then((items) => {
      cy.wrap(items)
        .eq(Math.floor(Math.random() * items.length))
        .click();
    });
  });
});

Cypress.Commands.add("pickCalculator", (expression = "500+500") => {
  cy.document().within(() => {
    cy.get('[data-cy="calculator-modal-btn"]').click();
    cy.get('[data-cy="calculator-body"]')
      .should("be.visible")
      .within(() => {
        cy.get('[data-cy="calculator-input"]').type(expression).type("{enter}");
      });
    cy.get('[data-cy="calculator-save-btn"]').click();
  });
});

Cypress.Commands.add("pickFile", (selector) => {
  cy.get(selector).selectFile("cypress/fixtures/images/jpg.jpg", { force: true, action: "select" });
});

Cypress.Commands.add("checkItemsSort", ({ items, prop, order } = {}) => {
  if (!items?.length || !prop || !order) throw new Error("No check sort params found.");
  cy.wrap(JSON.stringify(items) === JSON.stringify(sortItems({ items, prop, order })));
});

declare global {
  namespace Cypress {
    interface Chainable {
      deleteE2EUser(): Chainable<void>;
      login(): Chainable<void>;
      loginDemo(): Chainable<void>;
      getLang(): Chainable<string>;
      getDictionary(): Chainable<any>;
      pickSelect(selector: string, options?: { index?: number; returnValue?: boolean }): Chainable<string>;
      pickMultiSelect(selector: string, options?: { indexes?: number[]; indexesCount?: number }): Chainable<void>;
      pickDate(selector: string): Chainable<void>;
      pickPeriod(selector: string): Chainable<void>;
      pickRadioButton(selector: string): Chainable<void>;
      pickCalculator(expression: string): Chainable<void>;
      pickFile(selector: string): Chainable<void>;
      checkItemsSort(props: { items: SortItems; prop: SortProp; order: SortOrder }): Chainable<Boolean>;
    }
  }
}
