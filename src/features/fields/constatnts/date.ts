import { type DatesPeriod, DatesPeriods, ComplexFieldNames, type FieldTranslationRadioButtonOption } from "../types";

export const PERIODS: DatesPeriod[] = Object.values(DatesPeriods);

export const PERIOD_OPTIONS = PERIODS.map((period): { label_translation: FieldTranslationRadioButtonOption; value: DatesPeriod } => ({
  label_translation: `complex.${ComplexFieldNames.PERIOD}.options.${period}`,
  value: period,
}));
