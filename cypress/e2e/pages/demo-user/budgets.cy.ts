import { FieldIds, FilteredMultiPropsItems, SelectedOptionsData } from "../../../support/types";
import { getPropAndOrder, getReverseIndexesArray } from "../../../support/utils";

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
              cy.pickSelect(`#${FieldIds.SORT}`, { index, returnValue: true }).then(() => {
                cy.get("@selectedValue").then((selectedValue) => {
                  const { prop, order } = getPropAndOrder(selectedValue);
                  if (!prop || !order) return;

                  cy.get('[data-cy="budgets-filter-submit"]').click();

                  cy.document().within(() => {
                    cy.get('[data-cy="budget-item"]').then((budgets) => {
                      cy.checkItemsSort({ items: budgets, prop, order }).should("be.true");
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

        [FieldIds.ACCOUNTS, FieldIds.CATEGORIES].forEach((prop) => {
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
