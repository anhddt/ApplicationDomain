import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase";
import { addUserProfile } from "../middleware/data/addUserData";
// import { createUser } from "./FireStoreUtils";



export const sendPasswordReset =(email)=> {
  try{
       sendPasswordResetEmail(auth, email);
  } catch (error){
      console.log(error)
  }
}
/**
 * What this function does is sign helping the user
 * to sign in with the email and passsword
 * then redirect to the index page, which is "/".
 * 
 * It takes in a dictionary collection of email and password,
 * a function, and another function
 */
export const signInEmailPassword = async (
  inputs,
  setError,
  navigateTo,
  location
) => {
  try {
    await signInWithEmailAndPassword(auth, inputs.username, inputs.password);
    navigateTo(location.state?.from || "/");
  } catch (error) {
    setError(true);
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
  setError
) => {
  try {
    const newUser = await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );

    addUserProfile(newUser.user.uid, userInfo);
    // createUser(newUser.user.uid, userInfo);
    
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
