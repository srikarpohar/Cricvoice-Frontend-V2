import { createSlice } from "@reduxjs/toolkit";
import { IAlertDialogStoreState } from "../../stateModels";

const initialState:IAlertDialogStoreState = {key: '', open: false, message: '', type: null};

export const alertSlice = createSlice({
    name: 'alerts',
    initialState: initialState,
    reducers: {
        showDialog: (state: IAlertDialogStoreState, payload: any) => {
            return {...state, key: payload.key, open: true, message: payload.message, type: payload.type};
        },
        closeDialog: (state: IAlertDialogStoreState, payload: any) => {
            return {...state, key: payload.key, open: false};
        }
    }
});

export const { showDialog, closeDialog } = alertSlice.actions;

export default alertSlice.reducer;