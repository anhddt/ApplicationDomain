import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const logOut = async (navigateTo) => {
    try {
        await signOut(auth).then(() => {
            navigateTo("/");
        });
    } catch (error) {
        console.log(error);
    };
};