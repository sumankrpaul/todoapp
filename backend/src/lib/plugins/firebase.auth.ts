import admin from "firebase-admin";
import { firebaseConfig } from "lib/configs";

// @ts-ignore
const auth = admin.initializeApp({  credential: admin.credential.cert(firebaseConfig)}).auth();

export const verifyToken = async (authToken: string)=>{
    try{
        const decode = await auth.verifyIdToken(authToken);
        return decode.uid
    } catch(e){
        console.log(e);
        return false;
    }
}

export const userLookup = async (userId: string)=>{
    try {
        const userRecord = await auth.getUser(userId);
        return userRecord; 
    } catch(e){
        console.log("Here",e);
        return null;
    }
}