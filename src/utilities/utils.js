import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { addUserProfile } from "../middleware/data/addUserData";

/**
 * What this function does is sign helping the user
 * to sign in with the email and passsword
 * then redirect to the index page, which is "/".
 * 
 * It takes in the email, password, a function, and another function
 */
export const signInEmailPassword = async (
  email,
  password,
  navigateTo,
  setErrorMessage
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigateTo("/");
  } catch (error) {
    setErrorMessage(error.code.substr(5));
  }
};

/**
 * What this function does is sign helping the user
 * to create an account with the email and passsword
 * then redirect back to the login page,
 * so the user can login
 * 
 * It takes in the email, password, a function, and another function
 */
export const createAccount = async (
  userInfo,
  navigateTo,
  setError,
  setErrorMessage
) => {
  try {
    const newUser = await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );
    addUserProfile(newUser.user.uid, userInfo);
    navigateTo("/login");
  } catch (error) {
    setError(true);
    setErrorMessage(error.code.substr(5));
  }
};

/**
 * This functions logs the user out of the system
 * Just import it and call it as it is, logOut();
 */
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {}
};
