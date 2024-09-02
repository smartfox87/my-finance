import { getUserSession, loginDemoUserApi, loginUserApi, loginUserByProviderApi, logoutUserApi, registerUserApi } from "../../features/auth/api";
import { handleRejectedReducerAction } from "@/utils/errors";
import { rootReducer } from "@/store";
import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import type { Provider, User } from "@supabase/auth-js";
import type { RegisterData, UserPayload, LoginData, SessionPayload, AuthSliceState } from "@/features/auth";

const setUserData = (state: AuthSliceState, user: User | null) => {
  if (!user || state.user) return;
  state.user = user;
};

const clearUserData = (state: AuthSliceState) => {
  state.user = null;
};

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: AuthSliceState = {
  user: null,
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    registerUserThunk: create.asyncThunk<UserPayload, RegisterData, { rejectValue: string }>(
      async (userData, { rejectWithValue }) => {
        const { data, error } = await registerUserApi(userData);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload: { user } }) => setUserData(state, user),
      },
    ),
    loginUserThunk: create.asyncThunk<UserPayload, LoginData, { rejectValue: string }>(
      async (userData, { rejectWithValue }) => {
        const { data, error } = await loginUserApi(userData);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, options) => {
          console.log(options);
          // setUserData(state, user)
        },
      },
    ),
    loginDemoUserThunk: create.asyncThunk<UserPayload, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await loginDemoUserApi();
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload: { user } }) => setUserData(state, user),
      },
    ),
    logoutUserThunk: create.asyncThunk<void, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        console.log("111111111111111111111111111111111111111111");
        const { error } = await logoutUserApi();
        if (error) throw rejectWithValue(error.message);
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: clearUserData,
      },
    ),
    loginByProviderUserThunk: create.asyncThunk<void, Provider, { rejectValue: string }>(
      async (provider, { rejectWithValue }) => {
        const { error } = await loginUserByProviderApi(provider);
        if (error) throw rejectWithValue(error.message);
      },
      {
        rejected: handleRejectedReducerAction,
      },
    ),
    getUserSessionThunk: create.asyncThunk<SessionPayload, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getUserSession();
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload: { session } }) => {
          if (session?.user) setUserData(state, session.user);
          else clearUserData(state);
        },
      },
    ),
    setUserReducer: create.reducer<User>((state, { payload }) => setUserData(state, payload)),
    clearUserReducer: create.reducer((state) => clearUserData(state)),
  }),
});

declare module "@/types/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof authSlice> {}
}

rootReducer.inject(authSlice);

export const { registerUserThunk, loginUserThunk, loginDemoUserThunk, logoutUserThunk, loginByProviderUserThunk, getUserSessionThunk, setUserReducer, clearUserReducer } = authSlice.actions;
