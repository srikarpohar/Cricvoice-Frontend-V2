import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { IResponse, IUser } from "../../models";
import { baseApiSlice } from "../commonApiSlice";

export const authSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUpUser: builder.query<IResponse, void>({
            // args: IUser
            queryFn: async (args: any, api: BaseQueryApi, extraOptions: any, baseQuery: any) => {
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

        loginUser: builder.query<IResponse, void>({ // data: { username: string; password: string }
            query: (data) => ({
                url: 'login',
                params: data as any,
                method: 'get'
            })
        }),

        refreshToken: builder.query<IResponse, void>({
            query: () => ({
                url: 'refreshtoken',
                method: 'post'
            })
        }),

        logoutUser: builder.query<IResponse, void>({
            query: (data) => ({ // data: { id: string }
                url: 'logout',
                method:'post',
                body: data
            })
        })
    })
});

export const { useSignUpUserQuery } = authSlice;