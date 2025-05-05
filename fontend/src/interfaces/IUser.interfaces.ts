import { ISuccessResponse } from "./Common.interface";

export interface IUser {
    id: number;
    email: string;
    name: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserProfileResponse {
    detail: IUser
}

export interface IUserSignUpRequest {
    email: string;
    name: string;
    firebaseId: string
}

export interface IAddNewUserValue {
    email: string;
    name: string;
    password: string
}

export type IUserSignUpResonse = ISuccessResponse<IUser> 