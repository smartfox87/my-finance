import { createSelector } from "@reduxjs/toolkit";
import { selectCurrencies } from "@/store/selectors/references";
import { INITIAL_PROFILE_FIELDS, INITIAL_SETTINGS_FIELDS } from "@/constants/profile";
import { LazyLoadedSlices } from "@/store";
import { isProfileKey, Profile } from "@/types/profile";
import { FieldIds } from "@/types/field";

export const selectProfile = ({ profile }: LazyLoadedSlices): Profile | null => profile?.profile || null;

export const selectCurrency = createSelector([selectProfile, selectCurrencies], (profile, currencies) =>
  profile?.currency && !Array.isArray(profile.currency) ? profile.currency.symbol || profile.currency.code : currencies?.[0].symbol || currencies?.[0].code,
);

export const selectProfileFields = createSelector([selectProfile], (profile) =>
  INITIAL_PROFILE_FIELDS.map((field) => ({ ...field, value: isProfileKey(field.id) ? profile?.[field.id] : field.value })),
);

export const selectSettingsFields = createSelector([selectProfile, selectCurrencies], (profile, currencies) =>
  INITIAL_SETTINGS_FIELDS.map((field) => {
    if (field.id === FieldIds.CURRENCY) {
      const profileCurrency = profile?.[field.id];
      const value = !Array.isArray(profileCurrency) ? profileCurrency?.id : field.value;
      const options = currencies?.map(({ id, name, code }) => ({
        value: id,
        option: (
          <div data-text={`${code} ${name}`} className="flex items-center gap-2">
            <b className="w-10">{code}</b>
            <span>{name}</span>
          </div>
        ),
      }));

      return {
        ...field,
        value,
        options,
      };
    } else {
      return {
        ...field,
        value: isProfileKey(field.id) ? profile?.[field.id] : field.value,
      };
    }
  }),
);
