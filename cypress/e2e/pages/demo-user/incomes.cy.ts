import { SortItems, SortOrder, SortProp } from "../../../support/types";
import { getReverseIndexesArray } from "../../../support/utils";

describe("authorized incomes page", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.loginDemo();
      cy.getLang().then((lang) => cy.visit(`/${lang}/incomes`));
      cy.intercept("GET", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/incomes*`).as("get-incomes");
    });

    it("should sort incomes", () => {
      cy.wait("@get-incomes").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        const sortOptionsCount = 6;
        getReverseIndexesArray(sortOptionsCount).forEach((index) => {
          cy.get('[data-cy="incomes-filter-btn"]').click();
          cy.get('[data-cy="incomes-filter-form"]')
            .closest(".ant-drawer-open")
            .within(() => {
              cy.pickSelect("#sort", { index, returnValue: true }).then(() => {
                cy.get("@selectedValue").then((selectedValue) => {
                  if (!("value" in selectedValue) || typeof selectedValue.value !== "string") return;
                  const [prop, order] = selectedValue.value.split("_") as [SortProp, SortOrder];

                  cy.get('[data-cy="incomes-filter-submit"]').click();

                  cy.document().within(() => {
                    cy.get('[data-cy="income-item"]').then((incomes) => {
                      const items: SortItems = Cypress.$(incomes)
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
  });
});
