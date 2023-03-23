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
import { auth } from "./firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  verifyBeforeUpdateEmail,
  updatePassword,
} from "firebase/auth";

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
//CAN ONLY BE USED FOR ANYTHING OTHER THAN EMAIL AND PASSWORD
//TO UPDATE EMAIL OR PASSWORD, Use updatUserEmail() and updateUserPassword()
export const updateUserProperty = async (userID, key, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      [key]: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * update multiple fields in the user's profile
 */
export const bulkUpdateUserProperty = async (userID, info) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), info);
  } catch (error) {
    console.log(error);
  }
};

/**
 * import and use this function inside an async function
 * with try catch blocks
 * the update user email function
 * before updating the email, you have to
 * reauthenticate the user because firebase
 * requires recent login. If the user is logged in
 * for a long time and then decide to change the email,
 * the update email function will throw an error
 */
export const updateUserEmail = async (password, newEmail) => {
  try {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
  } catch (error) {
    throw new Error();
  }
};

/**
 * The update user password function
 * explaination is simmilar to the one above
 * @param {*} password string
 * @param {*} newPassword string
 */
export const updateUserPassword = async (password, newPassword) => {
  try {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
  } catch (error) {
    throw new Error();
  }
};

/**
 * DON'T BE MISTAKEN THIS WITH THE REGISTER FUNCTION. THIS IS NOT THE ONE!!!
 * This function is used to create new account in the chart of accounts
 * @param newAccount an object
 */
export const createAccount = async (newAccount) => {
  try {
    await setDoc(
      doc(db, "accounting", "chartOfAccounts"),
      { [newAccount.id]: newAccount },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};
/**
 * Once an account is created in the chart of accounts, use this to
 * get the chart of accounts
 */
export const getChartOfAccounts = async () => {
  try {
    const userDoc = await getDoc(doc(db, "accounting", "chartOfAccounts"));
    const userData = userDoc.data();
    return userData;
  } catch (error) {
    console.log(error);
  }
};

// This function gets the counter to assign a unique id to the account
export const getChartOfAccountsCounter = async () => {
  try {
    const userDoc = await getDoc(
      doc(db, "accounting", "chartOfAccountsCounter")
    );
    const counter = userDoc.data().counter;
    return counter;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function updates the counter of the chart of accounts everytime an account is created
 * @param {*} newCounter a number
 */
export const setChartOfAccountsCounter = async (newCounter) => {
  try {
    await setDoc(doc(db, "accounting", "chartOfAccountsCounter"), {
      counter: newCounter,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function update the
 * @param {*} current a row object
 * @param {*} change a synthetic event
 */
export const updateChartOfAccounts = async (newRow) => {
  try {
    await setDoc(
      doc(db, "accounting", "chartOfAccounts"),
      {
        [newRow.id]: newRow,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};
