// These models are database models coming from backend.
type responseData = IUser
                | { user: IUser, accessToken: string }
                | IUserPreference
                | null;



export interface IResponse {
    data: responseData | Partial<responseData> | responseData[] | Partial<responseData>[],
    success: boolean,
    statusCode: number,
    errorMessage?: string,
    retry?: boolean
}
export interface IUser {
    id?: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    isAdmin?: Boolean,
    active?: Boolean,
    refreshToken?: JSON,
    preference?: IUserPreference,
    profilePicRel?: IAttachment,
    profilePic?: File
}

export interface IAttachment {
    id: String,
    url: String,
    filename: String,
    filetype: String
}

export interface IUserPreference {
    id?: String,
    user: IUser,
    theme: String
}