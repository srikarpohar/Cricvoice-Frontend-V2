import { IAction, ILoginStoreState } from '../stateModels';
import { createSlice } from '@reduxjs/toolkit';

const initialUserState:ILoginStoreState = {user: null, isLoggedIn: false, isLoggedOut: false, accessToken: '', errorMessage: ''};

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialUserState,
    reducers: {
        loginUser: (state:ILoginStoreState, action: IAction) => {
            return {...state, user: action.payload.user, isLoggedIn: true, isLoggedOut: false, accessToken: action.payload.accessToken };
        },
        errorOnLoggingUser: (state:ILoginStoreState, action: IAction) => {
            return {...state, isLoggedIn: false, user: null, isLoggedOut: false, accessToken: '', errorMessage: action.payload };
        },
        logoutUser: (state:ILoginStoreState, action: IAction) => {
            return {...state, isLoggedIn: false, isLoggedOut: true, user: action.payload.user, accessToken: action.payload.accessToken, errorMessage: ''};
        },
    }
});

export const { loginUser, errorOnLoggingUser, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;

