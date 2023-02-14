import { doc, getDoc } from "firebase/firestore"; 
import { auth, firestore } from "../../firebase";

export const getUserType = async () => {
    const userUid = auth.currentUser.uid;
    const userDoc = await getDoc(doc(firestore, "newUsers", userUid));
    const userInfo = userDoc.data();
    return userInfo.userType? userInfo.userType : "none";
};

export const checkPwLength = (password) => {
    return password.length >= 8;
};

export const checkPwFirstChar = (password) => {
    return password.substr(0, 1).match(/[a-z]/i);
};

export const checkPwForNumbers = (password) => {
    return /\d/.test(password);
};

export const checkPwForSpecialChar = (password) => {
    const specialChars =
    /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    return specialChars.test(password);
};