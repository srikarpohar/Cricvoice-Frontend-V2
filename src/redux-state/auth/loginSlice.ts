import { ILoginStoreState } from '../stateModels';
import { createSlice } from '@reduxjs/toolkit';

const initialUserState:ILoginStoreState = {user: null, isLoggedIn: false, isLoggedOut: false, accessToken: '', errorMessage: ''};

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialUserState,
    reducers: {
        loginUser: (state:ILoginStoreState, payload: any) => {
            return {...state, user: payload.user, isLoggedIn: true, isLoggedOut: false, accessToken: payload.accessToken };
        },
        errorOnLoggingUser: (state:ILoginStoreState, payload: any) => {
            return {...state, isLoggedIn: false, user: null, isLoggedOut: false, accessToken: '', errorMessage: payload };
        },
        logoutUser: (state:ILoginStoreState, payload: any) => {
            return {...state, isLoggedIn: false, isLoggedOut: true, user: payload.user, accessToken: payload.accessToken, errorMessage: ''};
        },
    }
});

export const { loginUser, errorOnLoggingUser, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;

