import { getProfileApi, updateProfileApi } from "../api";
import { handleRejectedReducerAction } from "@/helpers/errors";
import { rootReducer } from "@/store";
import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import type { Types, ProfileData, ProfileSliceState, SettingsData } from "../types";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const setPeriod = ({ period }: Types) => localStorage.setItem("period", period || "year");

const initialState: ProfileSliceState = {
  profile: null,
};

export const profileSlice = createAppSlice({
  name: "profile",
  initialState,
  reducers: (create) => ({
    getProfileThunk: create.asyncThunk<Types, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getProfileApi();
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.profile = payload;
          setPeriod(payload);
        },
      },
    ),
    updateProfileThunk: create.asyncThunk<Types, ProfileData | SettingsData, { rejectValue: string }>(
      async (profileData, { rejectWithValue }) => {
        const { data, error } = await updateProfileApi(profileData);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.profile = payload;
          setPeriod(payload);
        },
      },
    ),
    clearProfile: create.reducer((state) => {
      state.profile = null;
    }),
  }),
});

declare module "@/types/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof profileSlice> {}
}

rootReducer.inject(profileSlice);

export const { clearProfile, getProfileThunk, updateProfileThunk } = profileSlice.actions;
