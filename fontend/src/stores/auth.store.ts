import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../plugins/firebase";
import { reactive, ref } from "vue";
import type { IUser } from "../interfaces/IUser.interfaces";
import { getUserProfile } from "../api/Auth.api";

interface IUserProfile extends IUser {
    isLoggedIn: boolean;
}

const defaultUser: IUserProfile = {
    isLoggedIn: false,
    id: 0,
    email: "",
    name: ""
}

export const useAuthStore = defineStore('auth', () => {

    const stateLoaded = ref(false);

    const userProfile = reactive<IUserProfile>(defaultUser);

    const resetUser = (newUser = defaultUser) => {
        Object.assign(userProfile, { ...newUser });
    }

    const updateProfileDetails = async () => {
        try {
            const userProfile = await getUserProfile();
            resetUser({ ...userProfile, isLoggedIn: true });
        } catch (e) {
            resetUser()
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            await updateProfileDetails();
            return user;
        } catch (e) {
            throw e
        }
    }

    const signUp = async (email: string, password: string) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            return user;
        } catch (e) {
            throw e;
        }
    }

    const isReady = async () => {
        if (!stateLoaded.value) {
            await auth.authStateReady();
            await updateProfileDetails();
        }
        stateLoaded.value = true;
        return
    }

    const logout = async () => {
        await auth.signOut();
        resetUser();
        window.location.reload();
    }


    return {
        userProfile,
        updateProfileDetails,
        login,
        isReady,
        logout,
        signUp,
        resetUser
    }
})