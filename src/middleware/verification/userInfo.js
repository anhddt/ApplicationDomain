import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

/**
 * This function retrieves collection from the database
 * The collection is in form of a dictionary
 */
export const getUserName = async () => {
  const userUid = auth.currentUser.uid;
  const userDoc = await getDoc(doc(firestore, "newUsers", userUid));
  const userInfo = userDoc.data();
  return userInfo.username;
};

/**
 * This function chaecks for length of the string argument
 * It returns true or false
 */
export const checkPwLength = (password) => {
  return password.length >= 8;
};

/**
 * This checks for the first character of the string is a letter
 * return true or false
 */
export const checkPwFirstChar = (password) => {
  return password.substr(0, 1).match(/[a-z]/i);
};

/**
 * Check if the password contains any number
 * return true or false
 */
export const checkPwForNumbers = (password) => {
  return /\d/.test(password);
};

/**
 * Check for any special character
 * return true or false
 */
export const checkPwForSpecialChar = (password) => {
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return specialChars.test(password);
};
