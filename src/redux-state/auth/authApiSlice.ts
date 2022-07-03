import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { IResponse, IUser } from "../../models";
import { baseApiSlice } from "../baseApiSlice";

export const authSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUpUser: builder.mutation<IResponse, IUser>({
            queryFn: async (args: any, _api: BaseQueryApi, _extraOptions: any, baseQuery: any) => {
                const { profilePic, ...userData } = args;
        
                const userResult = await baseQuery({
                    url: 'signup',
                    method: 'post',
                    body: userData
                });
        
                if(userResult.error) 
                    throw userResult.error;
        
                const formData = new FormData(),
                    user = (userResult.data as IResponse).data as IUser;
        
                // call upload API for profile pic upload.
                formData.append(
                    "profilePic",
                    profilePic ? profilePic : "",
                    profilePic?.name
                );
                formData.append("id", user.id ? user.id.toString() : '');
        
                const profilePicUploadResult = await baseQuery({
                    url: 'signup/upload',
                    method: 'post',
                    body: formData
                });
                return profilePicUploadResult;
            }
        }),

        loginUser: builder.mutation<IResponse, { username: string; password: string }>({
            query: (data) => ({
                url: 'login',
                params: data,
                credentials: "include",
                method: 'get'
            }),
            invalidatesTags: [{type: 'Auth', id: 'REFRESH_TOKEN'}]
        }),

        refreshToken: builder.query<IResponse, void>({
            query: () => ({
                url: 'refreshtoken',
                credentials: "include",
                method: 'post'
            }),
            providesTags: [{type: 'Auth', id: 'REFRESH_TOKEN'}]
        }),

        logoutUser: builder.mutation<IResponse, {id: string}>({
            query: (data) => ({ 
                url: 'logout',
                method:'post',
                credentials: "include",
                body: data
            }),
            invalidatesTags: [{type: 'Auth', id: 'REFRESH_TOKEN'}]
        })
    })
});

export const { 
    useSignUpUserMutation, 
    useLoginUserMutation, 
    useLogoutUserMutation, 
    useRefreshTokenQuery, 
    endpoints: authEndPoints
} = authSlice;