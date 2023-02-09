import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const createAccount = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
    } catch (error) {
        console.log(error);
    }
};