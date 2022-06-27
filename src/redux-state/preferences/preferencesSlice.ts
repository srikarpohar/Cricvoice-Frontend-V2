import { createSlice } from "@reduxjs/toolkit";
import { APP_THEMES, IPreferencesStoreState } from "../stateModels";

const initialState:IPreferencesStoreState = {theme: APP_THEMES.DEFAULT};

export const preferenceSlice = createSlice({
    name: 'preferences',
    initialState: initialState,
    reducers: {
        changeTheme: (state: IPreferencesStoreState, payload: any) => {
            return {...state, theme: payload};
        }
    }
});

export const { changeTheme } = preferenceSlice.actions;

export default preferenceSlice.reducer;