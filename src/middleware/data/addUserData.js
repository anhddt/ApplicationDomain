import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

/**
 * This function takes in a user ID, and a collection of information.
 * The collection is inform of a dictionary type of data.
 * It passes the collection to firestore
 * the setDoc function is an asyncronous function it has to be called with
 * await.
 * an async is placed at the top of the funciton like so.
 */
export const addUserProfile = async (uid, userInfo) => {
  try {
    await setDoc(doc(firestore, "newUsers", uid), userInfo);
  } catch (error) {
    console.log(error);
  }
};
