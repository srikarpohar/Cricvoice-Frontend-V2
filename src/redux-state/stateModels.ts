import { IUser } from "../models";

export enum APP_THEMES {
    DEFAULT = 'default',
    DARK = 'dark'
}

// These models are models used in redux store.
export interface IAction {
    type: string, 
    payload: any,
}

export interface IGlobalStoreState {
    login: ILoginStoreState,
    signup: ISignUpStoreState,
    preferences: IPreferencesStoreState,
    fileInput: IFileInputStoreState,
    alertDialog: IAlertDialogStoreState,
    toast: IToastStoreState
}

export interface IFileInputStoreState {
    key: string,
    showPreview: boolean,
    selectedFiles: any,
    noOfImagesUploaded: number
}

export interface ILoginStoreState {
    user: IUser | null,
    isLoggedIn: boolean,
    isLoggedOut: boolean,
    accessToken: string,
    errorMessage: string,
}

export interface ISignUpStoreState {
    user: IUser | null,
    isSignedUp: boolean | undefined,
    errorMessage: string,
}

export interface IPreferencesStoreState {
    theme: string
}

export interface IAlertDialogStoreState {
    key: string;
    open: boolean;
    type: 'error'
    | 'info'
    | 'success'
    | 'warning'
    | null;
    message: React.ReactNode;
}

export interface IToastStoreState {
    key: string;
    open: boolean,
    type: 'error'
    | 'info'
    | 'success'
    | 'warning'
    | null;
    message: string;
}