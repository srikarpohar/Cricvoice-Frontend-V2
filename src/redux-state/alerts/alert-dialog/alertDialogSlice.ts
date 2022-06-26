import { createSlice } from "@reduxjs/toolkit";
import { IAction, IAlertDialogStoreState } from "../../stateModels";

const initialState:IAlertDialogStoreState = {key: '', open: false, message: '', type: null};

export const alertSlice = createSlice({
    name: 'alerts',
    initialState: initialState,
    reducers: {
        showDialog: (state: IAlertDialogStoreState, action: IAction) => {
            return {...state, key: action.payload.key, open: true, message: action.payload.message, type: action.payload.type};
        },
        closeDialog: (state: IAlertDialogStoreState, action: IAction) => {
            return {...state, key: action.payload.key, open: false};
        }
    }
});

export const { showDialog, closeDialog } = alertSlice.actions;

export default alertSlice.reducer;