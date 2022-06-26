import { createSlice } from "@reduxjs/toolkit";
import { IAction, IToastStoreState } from "../../stateModels";

const initialState:IToastStoreState = {key: '', open: false, type: null, message: ''};

export const toastSlice = createSlice({
    name: 'toast',
    initialState: initialState,
    reducers: {
        showToast: (state: IToastStoreState, action: IAction) => {
            return {...state, key: action.payload.key, open: true, message: action.payload.message, type: action.payload.type};
        },
        closeToast: (state: IToastStoreState, action: IAction) => {
            return {...state, key: action.payload.key, open: false};
        },
    }
});

export const { showToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;