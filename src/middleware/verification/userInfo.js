import { doc, getDoc } from "firebase/firestore"; 
import { auth, firestore } from "../../firebase";

export const getUserType = async () => {
    const userUid = auth.currentUser.uid;
    const userDoc = await getDoc(doc(firestore, "newUsers", userUid));
    const userInfo = userDoc.data();
    return userInfo.userType? userInfo.userType : "none";
};