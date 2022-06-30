import { combineReducers, configureStore } from '@reduxjs/toolkit';

// reducers
import loginReducer from './auth/loginSlice';
import signUpReducer from './auth/signUpSlice';
import userPreferencesReducer from './preferences/preferencesSlice';
import alertDialogReducer from './alerts/alert-dialog/alertDialogSlice';
import toastReducer from './alerts/toast/toastSlice';
import { baseApiSlice } from './baseApiSlice';

const rootReducer = combineReducers({
    login: loginReducer,
    signup: signUpReducer,
    preferences: userPreferencesReducer,
    alertDialog: alertDialogReducer,
    toast: toastReducer,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

