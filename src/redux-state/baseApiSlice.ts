import { SERVER_URL } from "../environment/environment.dev";
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGlobalStoreState } from "./stateModels";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { IResponse, IUser } from "../models";
import { loginUser, logoutUser } from "./auth/loginSlice";

const createFetchWithTimeout = (timeout: number) => async (
    input: RequestInfo,
    init?: RequestInit
) => {
    if (init?.signal) {
        throw new Error(
            "it looks like graphql-request started using AbortSignal on its own. Please check graphql-request's recent updates"
        );
    }

    const controller = new AbortController();

    const timerId = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {
        return await fetch(input, { ...init, signal: controller.signal });
    } finally {
        clearTimeout(timerId);
    }
};

export const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers: Headers, { getState, endpoint }) => {
        const bypassUrls = ['login','signup', 'refreshtoken'];
        if(!(bypassUrls.includes(endpoint))) {
            headers.set('authorization', 'Bearer ' + (getState() as IGlobalStoreState).login.accessToken);
        }

        if(endpoint == 'signup/upload') {
            headers.set('content-type', 'multipart/form-data')
        }

        return headers;
    },
    fetchFn: createFetchWithTimeout(100000)
});

export const baseQueryReAuth = async (args: FetchArgs, api: BaseQueryApi, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if(result.error && result.error.status == 401) {
        // if error is 401 call refresh token api again
        const refreshResult = await baseQuery('/refreshtoken', api, extraOptions);

        if(refreshResult.data) { // if refresh token is success store access token in store.
            const { user, accessToken } = (refreshResult.data as IResponse).data as {user:IUser, accessToken: string};
            api.dispatch(loginUser({ 
                user: user,
                accessToken: accessToken
            }));

            result = await baseQuery(args, api, extraOptions);
            return result;
        } else {
            api.dispatch(logoutUser({}));
        }
    }

    return result;
}

export const baseApiSlice = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Auth'],
    baseQuery: baseQueryReAuth,
    endpoints: (builder) => ({})
});