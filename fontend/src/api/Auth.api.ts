import { FirebaseError } from "firebase/app";
import type { IAddNewUserValue, IUserLogin, IUserProfileResponse, IUserSignUpRequest, IUserSignUpResonse } from "../interfaces/IUser.interfaces";
import { api, api_protected } from "../plugins/axios";
import { useAuthStore } from "../stores/auth.store";

export const LogingUser = async (userCredentials: IUserLogin) => {
    try {
        const { login } = useAuthStore();
        const user = await login(userCredentials.email, userCredentials.password)
        if (user && user.user) {
            return { message: "Loggin successfully" }
        }
    } catch (e) {
        if (e instanceof FirebaseError) {
            throw { error: e.message }
        }
        throw e;
    }
}

export const getUserProfile = async () => {
    try {
        const userProfileResp = await api_protected<IUserProfileResponse>({
            method: 'get',
            url: '/user/profile'
        });
        return userProfileResp.data.detail;
    } catch (e) {
        throw e;
    }
}


export const addNewUser = async (userDetails: IAddNewUserValue) => {
    try {
        const { signUp, resetUser } = useAuthStore();
        const user = await signUp(userDetails.email, userDetails.password);
        if (user && user.user) {
            const newUser = await api<any, IUserSignUpResonse, IUserSignUpRequest>({
                method: 'post',
                url: '/user',
                data: {
                    email: userDetails.email,
                    name: userDetails.name,
                    firebaseId: user.user.uid
                }
            })
            resetUser({ ...newUser.data, isLoggedIn: true });
            return newUser;
        }

    } catch (e) {
        if (e instanceof FirebaseError) {
            throw { error: e.message }
        }
        throw e;
    }
}