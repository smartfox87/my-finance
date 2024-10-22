import { i18nRef } from "@/i18n";
import { isTruthy } from "@/predicates/common";
import type { MultiSelectOptionValue, SelectOption, SingleSelectValue } from "@/features/default-form";

// todo try importance of Object.assign everywhere
export const getOptionsObjectFromOptions = <T extends SingleSelectValue | MultiSelectOptionValue>(options: SelectOption<T>[]): Record<string, string> =>
  Object.assign({}, ...options.map(({ value, label, label_translation }) => value && { [value]: label_translation ? i18nRef.t?.(`fields.${label_translation}`) : label }, {}).filter(isTruthy));
