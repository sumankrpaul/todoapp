import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, type User } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../plugins/firebase";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const user = ref<User|null>(null);

    onAuthStateChanged(auth,(firebaseUser)=>{
        user.value = firebaseUser;
    })

    const login = (email: string, password: string)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signUp = (email: string, password: string)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = ()=>auth.signOut();

    return {
        login,
        signUp,
        logout,
        isAuthenticated: computed(()=> !!user.value)
    }
    
})