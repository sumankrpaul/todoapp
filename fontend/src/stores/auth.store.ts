import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, type User } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../plugins/firebase";
import { computed, ref } from "vue";
import type { IUser } from "../interfaces/IUser.interfaces";
import { getUserProfile } from "../api/Auth.api";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<string | null>(auth.currentUser ? auth.currentUser.uid : null);
    const profile = ref<IUser | null>(null)

    const isAuthenticated = computed(() => !!user.value);

    onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser ? firebaseUser.uid : null;
        updateProfile();
    })

    const updateProfile = () => {
        getUserProfile().then((userProfile) => {
            profile.value = userProfile
            console.log(user.value);
            console
        }).catch(() => {
            profile.value = null;
        })
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = () => auth.signOut();

    return {
        login,
        signUp,
        logout,
        isAuthenticated,
        userProfile: computed(() => profile.value)
    }
})