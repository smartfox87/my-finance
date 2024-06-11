import { FilteredMultiPropsItems, FilteredSinglePropItems, SelectedOptionsData, SortItems, SortOrder, SortProp } from "../../../support/types";
import { getReverseIndexesArray } from "../../../support/utils";

describe("authorized budgets page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.loginDemo();
      cy.getLang().then((lang) => cy.visit(`/${lang}/budgets`));
      cy.intercept("GET", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/budgets*`).as("get-budgets");
    });

    it("should sort budgets", () => {
      cy.wait("@get-budgets").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        const sortOptionsCount = 6;
        getReverseIndexesArray(sortOptionsCount).forEach((index) => {
          cy.get('[data-cy="budgets-filter-btn"]').click();
          cy.get('[data-cy="budgets-filter-form"]')
            .closest(".ant-drawer-open")
            .within(() => {
              cy.pickSelect("#sort", { index, returnValue: true }).then(() => {
                cy.get("@selectedValue").then((selectedValue) => {
                  if (!("value" in selectedValue) || typeof selectedValue.value !== "string") return;
                  const [prop, order] = selectedValue.value.split("_") as [SortProp, SortOrder];

                  cy.get('[data-cy="budgets-filter-submit"]').click();

                  cy.document().within(() => {
                    cy.get('[data-cy="budget-item"]').then((budgets) => {
                      const items: SortItems = Cypress.$(budgets)
                        .map((_, el) => {
                          const item = Cypress.$(el);
                          const result = { created: item.data("created") };
                          if (prop === "date") result[prop] = item.find(`[data-cy="item-${prop}"]`).attr("datetime");
                          else result[prop] = item.find(`[data-cy="item-${prop}"]`).text();
                          return result;
                        })
                        .get();
                      cy.checkItemsSort({ items, order }).should("be.true");
                    });
                  });
                });
              });
            });
        });
      });
    });

    it("should filter budgets", () => {
      cy.wait("@get-budgets").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);

        let initialItemsCount: number = 0;
        cy.get('[data-cy="budgets-items-count"]').then((element) => (initialItemsCount = parseInt(element.text())));

        ["accounts", "categories"].forEach((prop) => {
          cy.get('[data-cy="budgets-filter-btn"]').click();
          cy.get('[data-cy="budgets-filter-form"]')
            .closest(".ant-drawer-open")
            .within(() => {
              cy.pickMultiSelect(`#${prop}`, { indexesCount: 2, minIndex: 1, returnValue: true }).then(() => {
                cy.get<SelectedOptionsData>("@selectedValue").then((selectedValue) => {
                  const selectedLabels = selectedValue.map(({ label }) => label);

                  cy.get('[data-cy="budgets-filter-submit"]').click();

                  cy.document().within((document) => {
                    if (Cypress.$(document).find('[data-cy="budget-item"]').length) {
                      cy.get('[data-cy="budget-item"]').then((budgets) => {
                        const items: FilteredMultiPropsItems = Cypress.$(budgets)
                          .map((_, el) => Cypress.$(el).find(`[data-cy="item-${prop}"]`).text())
                          .get()
                          .map((item) => item.split(", "));
                        cy.checkMultiPropsItemsFilter({ items, filterPropValues: selectedLabels }).should("be.true");
                        cy.get(`[data-cy="active-filter-${prop}"]`)
                          .should("be.visible")
                          .click({ multiple: true })
                          .then(() => {
                            cy.get('[data-cy="budgets-items-count"]').then((element) => cy.wrap(parseInt(element.text())).should("eq", initialItemsCount));
                          });
                      });
                    } else {
                      cy.get('[data-cy="budgets-items-count"]').then((element) => cy.wrap(parseInt(element.text())).should("eq", 0));
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
