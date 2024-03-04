import { Action, configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          dispatch: {
            action: (action: Action) => action  
          }
        }  
      }
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

