import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { getProfileApi, updateProfileApi } from "@/api/profile.js";
import { handleRejected } from "@/helpers/processExtraReducersCases.js";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const setPeriod = ({ period }) => localStorage.setItem("period", period);

export const profileSlice = createAppSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: (create) => ({
    getProfileThunk: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getProfileApi();
        if (error) return rejectWithValue(error.message);
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
    updateProfileThunk: create.asyncThunk(
      async (profileData, { rejectWithValue }) => {
        const { data, error } = await updateProfileApi(profileData);
        if (error) return rejectWithValue(error.message);
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

export const { clearProfile, updateProfileThunk } = profileSlice.actions;
