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
<<<<<<< HEAD
 * then redirect to the previous page, or index page
 * which is this page -> "/" if the previous page is
 * the same as the current page.
 * 
 * It takes in the email, password, and 3 functions
=======
 * then redirect to the index page, which is "/".
 * 
 * It takes in the email, password, a function, and another function
>>>>>>> main
 */
export const signInEmailPassword = async (
  email,
  password,
  setError,
  navigateTo,
  location
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigateTo(location.state?.from || "/");
  } catch (error) {
    setError(true);
  }
};

/**
<<<<<<< HEAD
 * This functions creates an account with the email and passsword.
 * Then login, and redirect back to the index page,
 * which is this page -> "/".
 * 
 * It takes in the email, password, and a function
=======
 * What this function does is sign helping the user
 * to create an account with the email and passsword
 * then redirect back to the login page,
 * so the user can login
 * 
 * It takes in the email, password, a function, and another function
>>>>>>> main
 */
export const createAccount = async (
  userInfo,
  navigateTo,
  setError
) => {
  try {
    const newUser = await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );
    addUserProfile(newUser.user.uid, userInfo);
    try {
      await signInEmailPassword(auth, userInfo.email, userInfo.password);
    } catch (error) { 
    }
    navigateTo("/");
  } catch (error) {
    setError(true);
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
