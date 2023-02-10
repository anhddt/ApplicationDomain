import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

export const signInEmailPassword = async (email, password,navigateTo) => {
    try {   
        await signInWithEmailAndPassword(auth, email, password);
        navigateTo("/home");
    } catch (error) {
        console.log(error);
    }
};

export const createAccount = async (email, password, navigateTo) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
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