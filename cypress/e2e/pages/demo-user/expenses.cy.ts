import { SortItems, SortOrder, SortProp } from "../../../support/types";
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
        const sortOptionsCount = 6;
        getReverseIndexesArray(sortOptionsCount).forEach((index) => {
          cy.get('[data-cy="filter-expenses-btn"]').click();
          cy.get('[data-cy="filter-expenses-form"]')
            .closest(".ant-drawer-open")
            .within(() => {
              cy.pickSelect("#sort", { index, returnValue: true }).then(() => {
                cy.get("@selectedValue").then((selectedValue) => {
                  if (!("value" in selectedValue) || typeof selectedValue.value !== "string") return;
                  const [prop, order] = selectedValue.value.split("_") as [SortProp, SortOrder];

                  cy.get('[data-cy="filter-expenses-submit"]').click();

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
  });
});
