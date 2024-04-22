import { createContext, useCallback } from "react";
import { rootReducer } from "@/store/index.ts";

export const InjectReducerContext = createContext({ injectReducer: () => {} });
const thunks = {};

export const InjectReducerProvider = ({ children }) => {
  const injectReducer = useCallback((name) => {
    if (thunks[name]) return Promise.resolve(thunks[name]);
    return import(`@/store/${name}Slice.js`).then((module) => {
      rootReducer.inject({ reducerPath: name, reducer: module[`${name}Slice`].reducer });
      thunks[name] = module[`${name}Slice`].actions;
      return module[`${name}Slice`].actions;
    });
  }, []);

  return <InjectReducerContext.Provider value={{ thunks, injectReducer }}>{children}</InjectReducerContext.Provider>;
};
