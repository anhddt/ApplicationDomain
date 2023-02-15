import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
export const signInEmailPassword = async (email, password,navigateTo) => {
    try {   
        await signInWithEmailAndPassword(auth, email, password);
        navigateTo("/home");
    } catch (error) {
        console.log(error);
    }
};

export const sendPasswordReset =(email)=> {
    try{
        return sendPasswordResetEmail(auth, email);
    } catch (error){
        console.log(error)
    }
}

export const createAccount = async (userInfo, navigateTo) => {
    try {
        await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        navigateTo("/login");
    } catch (error) {
        console.log(error);
    }
};

export const logOut = async (navigateTo) => {
    try {
        await signOut(auth);
        navigateTo("/login");
    } catch (error) {
        console.log(error);
    };
};