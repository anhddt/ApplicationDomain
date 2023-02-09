import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const signInEmailPassword = async (email, password,navigateTo) => {
    try {   
        const user = await signInWithEmailAndPassword(auth, email, password);
        navigateTo("home");
        console.log(user);
    } catch (error) {
        console.log(error);
    }
};
