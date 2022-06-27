import { createSlice } from "@reduxjs/toolkit";
import { IToastStoreState } from "../../stateModels";

const initialState:IToastStoreState = {key: '', open: false, type: null, message: ''};

export const toastSlice = createSlice({
    name: 'toast',
    initialState: initialState,
    reducers: {
        showToast: (state: IToastStoreState, payload: any) => {
            return {...state, key: payload.key, open: true, message: payload.message, type: payload.type};
        },
        closeToast: (state: IToastStoreState, payload: any) => {
            return {...state, key: payload.key, open: false};
        },
    }
});

export const { showToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;