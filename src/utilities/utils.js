import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { addUserProfile } from "../middleware/data/addUserData";

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

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {}
};
