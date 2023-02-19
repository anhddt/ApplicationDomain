import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export const sendPasswordReset = (email) => {
  try {
    sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
};
