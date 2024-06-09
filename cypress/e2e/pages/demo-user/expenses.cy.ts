import { FilteredSinglePropItems, SelectedOptionsData, SortItems, SortOrder, SortProp } from "../../../support/types";
import { getReverseIndexesArray } from "../../../support/utils";

describe("authorized expenses page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.loginDemo();
      cy.getLang().then((lang) => cy.visit(`/${lang}/expenses`));
      cy.intercept("GET", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/costs*`).as("get-expenses");
    });

    it("should sort expenses", () => {
      cy.wait("@get-expenses").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);

        const sortOptionsCount: number = 6;
        getReverseIndexesArray(sortOptionsCount).forEach((index) => {
          cy.get('[data-cy="expenses-filter-btn"]').click();
          cy.get('[data-cy="expenses-filter-form"]')
            .closest(".ant-drawer-open")
            .within(() => {
              cy.pickSelect("#sort", { index, returnValue: true }).then(() => {
                cy.get("@selectedValue").then((selectedValue) => {
                  if (!("value" in selectedValue) || typeof selectedValue.value !== "string") return;
                  const [prop, order] = selectedValue.value.split("_") as [SortProp, SortOrder];

                  cy.get('[data-cy="expenses-filter-submit"]').click();

                  cy.document().within(() => {
                    cy.get('[data-cy="expense-item"]').then((expenses) => {
                      const items: SortItems = Cypress.$(expenses)
                        .map((_, el) => {
                          const item = Cypress.$(el).find(`[data-cy="item-${prop}"]`);
                          return prop === "date" ? [item.attr("datetime"), item.data("created")] : item.text();
                        })
                        .get();
                      cy.checkItemsSort({ items, prop, order }).should("be.true");
                    });
                  });
                });
              });
            });
        });
      });
    });

    it("should filter expenses", () => {
      cy.wait("@get-expenses").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);

        let initialItemsCount: number = 0;
        cy.get('[data-cy="expenses-items-count"]').then((element) => (initialItemsCount = parseInt(element.text())));

        ["account", "category"].forEach((prop) => {
          cy.get('[data-cy="expenses-filter-btn"]').click();
          cy.get('[data-cy="expenses-filter-form"]')
            .closest(".ant-drawer-open")
            .within(() => {
              cy.pickMultiSelect(`#${prop}`, { indexesCount: 2, minIndex: 1, returnValue: true }).then(() => {
                cy.get<SelectedOptionsData>("@selectedValue").then((selectedValue) => {
                  const selectedLabels = selectedValue.map(({ label }) => label);

                  cy.get('[data-cy="expenses-filter-submit"]').click();

                  cy.document().within((document) => {
                    if (Cypress.$(document).find('[data-cy="expense-item"]').length) {
                      cy.get('[data-cy="expense-item"]').then((expenses) => {
                        const items: FilteredSinglePropItems = Cypress.$(expenses)
                          .map((_, el) => Cypress.$(el).find(`[data-cy="item-${prop}"]`).text())
                          .get();
                        cy.checkSinglePropItemsFilter({ items, filterPropValues: selectedLabels }).should("be.true");
                        cy.get(`[data-cy="active-filter-${prop}"]`)
                          .should("be.visible")
                          .click({ multiple: true })
                          .then(() => {
                            cy.get('[data-cy="expenses-items-count"]').then((element) => cy.wrap(parseInt(element.text())).should("eq", initialItemsCount));
                          });
                      });
                    } else {
                      cy.get('[data-cy="expenses-items-count"]').then((element) => cy.wrap(parseInt(element.text())).should("eq", 0));
                      cy.get(`[data-cy="active-filter-${prop}"]`).should("be.visible").click({ multiple: true });
                    }
                  });
                });
              });
            });
        });
      });
    });
  });
});
