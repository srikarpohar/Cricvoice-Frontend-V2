import { IAction, ISignUpStoreState } from '../stateModels';
import { createSlice } from '@reduxjs/toolkit';

const initialUserState:ISignUpStoreState = {user: null, isSignedUp: undefined, errorMessage: ''};

export const signUpSlice = createSlice({
    name: 'signup',
    initialState: initialUserState,
    reducers: {
        signUpUser: (state: ISignUpStoreState, action: IAction) => {
            return {...state, user: action.payload, isSignedUp: true};
        },
        errorOnSigningUpUser: (state: ISignUpStoreState, action: IAction) => {
            return {...state, user: null, isSignedUp: false, errorMessage: action.payload};
        },
    }
});

export const { signUpUser, errorOnSigningUpUser } = signUpSlice.actions;

export default signUpSlice.reducer;