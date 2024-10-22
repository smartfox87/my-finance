import type { ProcessedAccountItem } from "@/types/accounts";
import type { CostCategory } from "@/types/references";
import type { MultiSelectOptionValue, SelectOption } from "@/types/field";

export const getOptionsFromItemsList = <T extends ProcessedAccountItem | CostCategory>(itemsList: T[]): SelectOption<MultiSelectOptionValue>[] =>
  itemsList.map(({ id, name }) => ({ value: id, label: name }));
