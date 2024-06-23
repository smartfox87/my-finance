import { supabaseClient } from "./supabase";
import { FilteredMultiPropsItems, FilteredSinglePropItems, FilterPropValues, Namespaces, SelectedOptionsData, SortItem, SortOrder, SortProp } from "./types";
import { compareMultiPropsItemsToFilterPropValues, compareSinglePropItemsToFilterPropValues, sortItems } from "./utils";

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
    const namespacesArray = Object.values(Namespaces);
    Promise.all(namespacesArray.map((namespace) => cy.fixture(`locales/${lang}/${namespace}.json`))).then((jsonArray) => {
      if (!jsonArray?.length) throw new Error(`Could not load dictionary for language: ${lang}`);
      const jsonDictionaries = jsonArray.reduce((acc, json, index) => ({ ...acc, [namespacesArray[index]]: json }), {});
      cy.wrap(jsonDictionaries);
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

        cy.wrap(options)
          .eq(resultIndex)
          .click({ force: true })
          .then((option) => {
            if (returnValue) cy.wrap({ label: option.text(), value: option.find("[data-value]").data("value") }).as("selectedValue");
          });
      });
    });
});

Cypress.Commands.add("pickMultiSelect", (selector, { indexes, indexesCount, minIndex = 0, returnValue, allSelectable = true } = {}) => {
  cy.get(selector)
    .closest(".ant-select")
    .click()
    .within((select) => {
      cy.get(".ant-select-item").then((options) => {
        const optionsLength = options.length;
        if (!optionsLength) throw new Error("No selectable options found.");
        const resultIndexes: Set<number> = new Set();
        const selectedValue: SelectedOptionsData = [];

        if (typeof indexesCount === "number") {
          while (resultIndexes.size < indexesCount) resultIndexes.add(Math.floor(Math.random() * (optionsLength - minIndex)) + minIndex);
        } else if (Array.isArray(indexes)) {
          indexes.forEach((index) => resultIndexes.add(index >= 0 ? Math.min(index, optionsLength - 1) : Math.max(index + optionsLength, 0)));
        }

        Array.from(resultIndexes).forEach((index) => {
          cy.wrap(options)
            .eq(index)
            .click({ force: true })
            .then((option) => {
              if (returnValue) selectedValue.push({ label: option.text(), value: option.find("[data-value]").data("value") });
            });
        });
        if (returnValue) {
          if (allSelectable)
            cy.wrap(options)
              .first()
              .then((option) => selectedValue.unshift({ label: option.text(), value: option.find("[data-value]").data("value") }));
          cy.wrap(selectedValue).as("selectedValue");
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
  if (!items?.length || !order) throw new Error("No check sort params found.");
  const sortedItems: SortItem[] = Cypress.$(items)
    .map((_, el) => {
      const item = Cypress.$(el);
      const propItem = item.find(`[data-cy="item-${prop}"]`);
      const propValue = prop === SortProp.DATE ? propItem.attr("datetime") ?? "" : propItem.text() ?? "";
      if (prop === SortProp.AMOUNT) return { created: String(item.data("created") ?? ""), amount: propValue };
      if (prop === SortProp.DATE) return { created: String(item.data("created") ?? ""), date: propValue };
      else return { created: String(item.data("created") ?? ""), name: propValue };
    })
    .get();
  cy.getLang().then((locale) => {
    cy.wrap(JSON.stringify(sortedItems) === JSON.stringify(sortItems({ items: sortedItems, order, locale })));
  });
});

Cypress.Commands.add("checkSinglePropItemsFilter", ({ items, filterPropValues } = {}) => {
  if (!items?.length || !filterPropValues?.length) throw new Error("No check filter params found.");
  cy.wrap(compareSinglePropItemsToFilterPropValues({ items, filterPropValues }));
});

Cypress.Commands.add("checkMultiPropsItemsFilter", ({ items, filterPropValues } = {}) => {
  if (!items?.length || !filterPropValues?.length) throw new Error("No check filter params found.");
  cy.wrap(compareMultiPropsItemsToFilterPropValues({ items, filterPropValues }));
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
      pickMultiSelect(selector: string, options?: { indexes?: number[]; indexesCount?: number; minIndex?: number; returnValue?: boolean; allSelectable?: boolean }): Chainable<void>;
      pickDate(selector: string): Chainable<void>;
      pickPeriod(selector: string): Chainable<void>;
      pickRadioButton(selector: string): Chainable<void>;
      pickCalculator(expression: string): Chainable<void>;
      pickFile(selector: string): Chainable<void>;
      checkItemsSort(props: { items: JQuery<HTMLElement>; prop: SortProp; order: SortOrder }): Chainable<Boolean>;
      checkSinglePropItemsFilter(props: { items: FilteredSinglePropItems; filterPropValues: FilterPropValues }): Chainable<Boolean>;
      checkMultiPropsItemsFilter(props: { items: FilteredMultiPropsItems; filterPropValues: FilterPropValues }): Chainable<Boolean>;
    }
  }
}
