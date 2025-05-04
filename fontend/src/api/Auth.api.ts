import type { IUserLogin, IUserProfileResponse } from "../interfaces/IUser.interfaces";
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