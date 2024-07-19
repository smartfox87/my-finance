import { ProcessedBudgetItem } from "@/types/budgets";

export const getOnlyValuesFromData = (data: ProcessedBudgetItem) => Object.assign({}, ...Object.entries(data).map(([key, value]) => ({ [key]: value })));
