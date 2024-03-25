import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { getUserSession, loginDemoUserApi, loginUserApi, loginUserByProviderApi, logoutUserApi, registerUserApi } from "../api/auth.js";
import { handleRejected } from "@/helpers/processExtraReducersCases.js";

const setUserData = (state, user) => {
  state.user = user;
  localStorage.setItem("user_id", user.id);
};

const clearUserData = (state) => {
  state.user = null;
  localStorage.removeItem("user_id");
};

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: (create) => ({
    registerUserThunk: create.asyncThunk(
      async (userData, { rejectWithValue }) => {
        const { data, error } = await registerUserApi(userData);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload: { user } }) => setUserData(state, user),
      },
    ),
    loginUserThunk: create.asyncThunk(
      async (userData, { rejectWithValue }) => {
        const { data, error } = await loginUserApi(userData);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload: { user } }) => setUserData(state, user),
      },
    ),
    loginDemoUserThunk: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const { data, error } = await loginDemoUserApi();
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload: { user } }) => setUserData(state, user),
      },
    ),
    logoutUserThunk: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const { data, error } = await logoutUserApi();
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: clearUserData,
      },
    ),
    loginByProviderUserThunk: create.asyncThunk(
      async (provider, { rejectWithValue }) => {
        const { data, error } = await loginUserByProviderApi(provider);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
      },
    ),
    getUserSessionThunk: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getUserSession();
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload: { session } }) => {
          if (session?.user) setUserData(state, session.user);
          else clearUserData(state);
        },
      },
    ),
  }),
});

export const { logoutUserThunk, getUserSessionThunk } = authSlice.actions;
