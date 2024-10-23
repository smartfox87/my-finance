import { i18nRef } from "@/i18n";
import type { MultiSelectOptionValue, SelectOption } from "@/features/fields";

export const getOptionsTranslations = <V extends MultiSelectOptionValue>(options: SelectOption<V>[]): SelectOption<MultiSelectOptionValue>[] =>
  options.map(({ label, label_translation, value }) => {
    const labelString = label_translation ? i18nRef.t?.(`fields.${label_translation}`) : label;
    return { label: labelString, value };
  });
