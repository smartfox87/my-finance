import { processBudgetItem } from "./process-budget-item";
import { describe, expect, it, jest } from "@jest/globals";
import type { BudgetItem } from "../../types";

describe("processBudgetItem", () => {
  it("processes budget item with valid data", () => {
    const budgetItem: BudgetItem = {
      id: 1,
      created_at: "2024-10-10",
      amount: 1000,
      name: "Test Budget",
      accounts: [{ id: 1 }, { id: 2 }],
      categories: [{ id: 1 }, { id: 2 }],
      period: '["2023-10-10","2023-11-11"]',
    };
    const result = processBudgetItem(budgetItem);
    expect(result).toEqual({
      ...budgetItem,
      accounts: [1, 2],
      categories: [1, 2],
      period: ["2023-10-10", "2023-11-11"],
    });
  });

  it("processes budget item with empty accounts and categories", () => {
    const budgetItem: BudgetItem = {
      id: 1,
      created_at: "2024-10-10",
      amount: 1000,
      name: "Test Budget",
      accounts: [],
      categories: [],
      period: '["2023-10-10","2023-11-11"]',
    };
    const result = processBudgetItem(budgetItem);
    expect(result).toEqual({
      ...budgetItem,
      accounts: [],
      categories: [],
      period: ["2023-10-10", "2023-11-11"],
    });
  });

  it("processes budget item with invalid period", () => {
    const budgetItem: BudgetItem = {
      id: 1,
      created_at: "2024-10-10",
      amount: 1000,
      name: "Test Budget",
      accounts: [],
      categories: [],
      period: '["2023-10-10","invalid-date"]',
    };
    expect(() => processBudgetItem(budgetItem)).toThrow("Invalid dates value");
  });
});
