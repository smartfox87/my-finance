import { createSelector } from "@reduxjs/toolkit";
import { selectCurrencies } from "@/store/selectors/references.js";
import { INITIAL_PROFILE_FIELDS, INITIAL_SETTINGS_FIELDS } from "@/initial-data/profile.js";

export const selectProfile = ({ profile }) => profile?.profile || null;

export const selectCurrency = createSelector([selectProfile, selectCurrencies], (profile, currencies) =>
  profile?.currency ? profile.currency.symbol || profile.currency.code : currencies?.[0].symbol || currencies?.[0].code,
);

export const selectProfileFields = createSelector([selectProfile], (profile) => INITIAL_PROFILE_FIELDS.map((field) => ({ ...field, value: profile?.[field.id] || "" })));

export const selectSettingsFields = createSelector([selectProfile, selectCurrencies], (profile, currencies) =>
  INITIAL_SETTINGS_FIELDS.map((field) =>
    field.id === "currency"
      ? {
          ...field,
          value: profile?.[field.id]?.id || "",
          options: currencies?.map(({ id, name, code }) => ({
            value: id,
            option: (
              <div data-text={`${code} ${name}`} className="flex items-center gap-2">
                <b className="w-10">{code}</b>
                <span>{name}</span>
              </div>
            ),
          })),
        }
      : { ...field, value: profile?.[field.id] || "" },
  ),
);
