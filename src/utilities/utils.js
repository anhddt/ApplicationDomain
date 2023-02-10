import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { addUserProfile } from "../middleware/addUserData";
export const signInEmailPassword = async (email, password,navigateTo) => {
    try {   
        await signInWithEmailAndPassword(auth, email, password);
        navigateTo("/home");
    } catch (error) {
        console.log(error);
    }
};

export const createAccount = async (userInfo, navigateTo) => {
    try {
        const newUser = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        // addUserProfile(newUser.user.uid, userInfo);
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