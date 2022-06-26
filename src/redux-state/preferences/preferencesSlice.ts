import { createSlice } from "@reduxjs/toolkit";
import { APP_THEMES, IAction, IPreferencesStoreState } from "../stateModels";

const initialState:IPreferencesStoreState = {theme: APP_THEMES.DEFAULT};

export const preferenceSlice = createSlice({
    name: 'preferences',
    initialState: initialState,
    reducers: {
        changeTheme: (state: IPreferencesStoreState, action: IAction) => {
            return {...state, theme: action.payload};
        }
    }
});

export const { changeTheme } = preferenceSlice.actions;

export default preferenceSlice.reducer;