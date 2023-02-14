import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

export const addUserProfile = async (uid, userInfo) => {
  try {
    await setDoc(doc(firestore, "newUsers", uid), userInfo);
  } catch (error) {
    console.log(error);
  }
};
