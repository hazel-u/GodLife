import { configureStore } from "@reduxjs/toolkit";

import dialogReducer from "./dialog";
import snackbarReducer from "./snackbar";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
