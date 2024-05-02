import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import { getProfileApi, updateProfileApi } from "@/api/profile";
import { handleRejected } from "@/helpers/processExtraReducersCases";
import { rootReducer } from "@/store";
import { Profile, ProfileData } from "@/types/profile";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const setPeriod = ({ period }: Profile) => localStorage.setItem("period", period || "year");

interface State {
  profile: Profile | null;
}

const initialState: State = {
  profile: null,
};

export const profileSlice = createAppSlice({
  name: "profile",
  initialState,
  reducers: (create) => ({
    getProfileThunk: create.asyncThunk<Profile, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getProfileApi();
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.profile = payload;
          setPeriod(payload);
        },
      },
    ),
    updateProfileThunk: create.asyncThunk<Profile, ProfileData, { rejectValue: string }>(
      async (profileData, { rejectWithValue }) => {
        const { data, error } = await updateProfileApi(profileData);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
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

declare module "@/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof profileSlice> {}
}

const injectedReducers = rootReducer.inject(profileSlice);

export const { clearProfile, getProfileThunk, updateProfileThunk } = profileSlice.actions;
