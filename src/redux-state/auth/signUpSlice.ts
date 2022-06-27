import { ISignUpStoreState } from '../stateModels';
import { createSlice } from '@reduxjs/toolkit';

const initialUserState:ISignUpStoreState = {user: null, isSignedUp: undefined, errorMessage: ''};

export const signUpSlice = createSlice({
    name: 'signup',
    initialState: initialUserState,
    reducers: {
        signUpUser: (state: ISignUpStoreState, payload: any) => {
            return {...state, user: payload, isSignedUp: true};
        },
        errorOnSigningUpUser: (state: ISignUpStoreState, payload: any) => {
            return {...state, user: null, isSignedUp: false, errorMessage: payload};
        },
    }
});

export const { signUpUser, errorOnSigningUpUser } = signUpSlice.actions;

export default signUpSlice.reducer;