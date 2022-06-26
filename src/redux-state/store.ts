import { combineReducers, configureStore } from '@reduxjs/toolkit';

// reducers
import loginReducer from './login/loginSlice';
import signUpReducer from './signup/signUpSlice';
import userPreferencesReducer from './preferences/preferencesSlice';
import alertDialogReducer from './alerts/alert-dialog/alertDialogSlice';
import toastReducer from './alerts/toast/toastSlice';


const rootReducer = combineReducers({
    login: loginReducer,
    signup: signUpReducer,
    preferences: userPreferencesReducer,
    alertDialog: alertDialogReducer,
    toast: toastReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;

