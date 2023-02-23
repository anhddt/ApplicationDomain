import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { firestore as db } from "./firebase";

/**
 * This function takes in a user ID, and a collection of information.
 * The collection is inform of a dictionary type of data.
 * It passes the collection to firestore
 * the setDoc function is an asyncronous function it has to be called with
 * await.
 * an async is placed at the top of the funciton like so.
 */
export const setUserProfile = async (uid, userInfo) => {
  try {
    await setDoc(doc(db, "newUsers", uid), userInfo);
  } catch (error) {
    console.log(error);
  }
};

// This function gets the entire user profile
export const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "newUsers", uid));
    const userInfo = userDoc.data();
    return userInfo;
  } catch (error) {}
};

//returns the UID of a user based on their username
export const getUIDByUserName = async (username) => {
  try {
    const q = query(
      collection(db, "newUsers"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot[0].id;
  } catch (error) {
    console.log(error);
  }
};

//a function to return a collection of users as a map
export const getUsers = async () => {
  try {
    let userMap = new Map();
    const querySnapshot = await getDocs(collection(db, "newUsers"));
    querySnapshot.forEach(function (doc) {
      userMap.set(doc.data().userName, doc.data());
    });
    return userMap;
  } catch (error) {
    console.log(error);
  }
};

// This function return the users profile as a package of objects
// used in the AdminPage component
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "newUsers"));
    return querySnapshot;
  } catch (error) {
    console.log(error);
  }
};

//a function delete a user
export const removeUser = async (userID) => {
  try {
    await deleteDoc(doc(db, "newUsers", userID));
    console.log("Deleted user " + userID);
  } catch (error) {
    console.log(error);
  }
};

//a function to remove users based on userName
export const removeUserbyName = async (userName) => {
  const q = query(
    collection(db, "newUsers"),
    where("username", "==", userName)
  );
  try {
    const querySnapshot = await getDocs(q);
    await deleteDoc(db, "newUsers", querySnapshot[0].id);
  } catch (error) {
    console.log(error);
  }
};

//functions to update properties of a use
//a function to update the firstName of a user
export const updateUserProperty = async (userID, key, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      [key]: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};
