import dayjs from "dayjs";
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
  getCountFromServer,
} from "firebase/firestore";
import { firestore as db } from "./firebase";
import { getBalance } from "../../components/accounts/accountDetail/AccountDetail";
import { auth } from "./firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  verifyBeforeUpdateEmail,
  updatePassword,
} from "firebase/auth";
import isBetween from "dayjs/plugin/isBetween";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
dayjs.extend(isBetween);

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
export const getUserByUserName = async (username) => {
  try {
    const q = query(
      collection(db, "newUsers"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
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
 * This function is used to get the document from a collection
 */
export const getDataBulk = async (collection, document) => {
  try {
    const userDoc = await getDoc(doc(db, collection, document));
    const userData = userDoc.data();
    return userData;
  } catch (error) {
    console.log(error);
  }
};

/**
 * =================================================================
 * This section is dedicated for accounting acvivities.            *
 * =================================================================
 */

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
 * This function is used for creating a new financial account
 * the chart of accounts
 * @param newAccount an object
 */
export const createAccount = async (newAccount) => {
  try {
    await setDoc(
      doc(db, "accounting", "chartOfAccounts", "accounts", `${newAccount.id}`),
      newAccount
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function gets all accounts
 * @param {*} id
 * @returns account data
 */
export const getAllAccounts = async () => {
  try {
    const myDoc = await getDocs(
      collection(db, "accounting", "chartOfAccounts", "accounts")
    );
    return myDoc.docs;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function gets all active accounts
 * @param {*} id
 * @returns account data
 */
export const getAllActiveAccounts = async () => {
  try {
    const coll = collection(db, "accounting", "chartOfAccounts", "accounts");
    const q = query(coll, where("status", "==", "Active"));
    const myDoc = await getDocs(q);
    return myDoc.docs;
  } catch (error) {
    console.log(error);
  }
};

/**
 * The name said it all, get all of the accounts by it's subcategory components
 * @param {*} subCat
 * @returns a list with all of the account objects with the same subCat value
 */
export const getAccountsBySubCat = async (subCat) => {
  try {
    const accountsRef = collection(
      db,
      "accounting",
      "chartOfAccounts",
      "accounts"
    );
    const q = query(accountsRef, where("subCat", "==", subCat));
    const querySnapshot = await getDocs(q);
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    return list;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function gets all accounts and return a list of id and name
 * @param {*} id
 * @returns account data
 */
export const getAccountList = async () => {
  try {
    const myDoc = await getAllActiveAccounts();
    const arr = [];
    myDoc.map((item) => arr.push(`${item.data().id} - ${item.data().name}`));
    arr.sort((a, b) => a.localeCompare(b));
    return arr;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function gets the individual account with with the given id
 * @param {*} id
 * @returns account data
 */
export const getAccount = async (id) => {
  try {
    const myDoc = await getDoc(
      doc(db, "accounting", "chartOfAccounts", "accounts", `${id}`)
    );
    return myDoc.data();
  } catch (error) {
    console.log(error);
  }
};
/**
 * This function gets the individual account with with the given id
 * @param {*} name a string
 * @returns account data
 */
export const getAccountByName = async (name) => {
  try {
    const coll = collection(db, "accounting", "chartOfAccounts", "accounts");
    const q = query(coll, where("name", "==", name));
    const myDoc = await getDocs(q);
    return myDoc.docs;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function updates the chart of account cell, any cell
 * @param {*} current a row object
 * @param {*} change a synthetic event
 */
export const updateChartOfAccounts = async (row, value, date) => {
  try {
    await setDoc(
      doc(db, "accounting", "chartOfAccounts", "accounts", `${row.id}`),
      {
        [row.field]: value,
        modifiedDate: date,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function updates the chart of account balance
 * @param {*} id id of the account
 * @param {*} balance newest balance
 */
export const updateAccountBalance = async (id) => {
  try {
    const parentAcc = await getAccount(id);
    const details = await getAllEntries(id);
    const rawData = [];
    details.map((detail) => rawData.push(detail.data()));
    const balance = getBalance(
      rawData.filter((row) => row.status === "Approved"),
      parentAcc.normalSide
    );
    await setDoc(
      doc(db, "accounting", "chartOfAccounts", "accounts", `${id}`),
      {
        balance: balance,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * All accounts automatically has a balance with them.
 * However they do not have the balance for any arbitary range.
 * Therefore, this function is made to serve the purpose.
 * fromDate <= entry created date, which is the ID of the entry <= toDate
 * @param {*} id number, id of the account
 * @param {*} fromDate string, date object from the calendar
 * @param {*} toDate string, date object from the calendar
 * @return the balance corresponding to the account and the date [range] provided
 */
export const getAccountBalanceWithDateRange = async (
  id,
  normalSide,
  fromDate,
  toDate
) => {
  try {
    const allEntries = await getAllEntries(id);
    const arr = allEntries.filter(
      (entry) =>
        entry.data().status === "Approved" &&
        dayjs(entry.data().id).isBetween(
          dayjs(fromDate),
          dayjs(toDate),
          "day",
          []
        )
    );
    let total = 0;
    arr.forEach((entry) => {
      const e = entry.data();
      if (normalSide === "Debit") {
        if (e.type === "Debit") total += e.total;
        else total -= e.total;
      } else {
        if (e.type === "Credit") total += e.total;
        else total -= e.total;
      }
    });
    return total;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete an account and its childrents(events and entries).
 * @param {*} id
 */
export const deleteAccount = async (id) => {
  id.map(async (i) => {
    try {
      await deleteDoc(
        doc(db, "accounting", "chartOfAccounts", "accounts", `${i}`)
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  });
};
/**
 * This function create an event in the database
 * @param {*} event an event object which has the event date, previous object,
 * current object, and what has changed object
 */
export const createAccountEvent = async (event) => {
  try {
    await setDoc(
      doc(db, "accounting", "chartOfAccounts", "events", event.eventDate),
      event
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * =================================================================
 * This function gets all events in CHART OF ACCOUNTS              *
 * =================================================================
 * @param {*} id
 * @returns account data
 */
export const getAllEvents = async () => {
  try {
    const myDoc = await getDocs(
      collection(db, "accounting", "chartOfAccounts", "events")
    );
    return myDoc.docs;
  } catch (error) {
    console.log(error);
  }
};

/**
 * ======================================================================
 * This section is dedicated for account details and event log for each *
 * account                                                              *
 * ======================================================================
 */

/**
 * This function create an entry to the database
 * @param {*} entry an object which has the date, and the content
 * of the entry such as name, date, balance, status, etc.
 * NOTICE!!!
 * The date is the id of the entry
 * Entry parent is the account id that it's associated with
 */
export const createEntry = async (newEntry) => {
  const arr = [];
  newEntry.files.map((file) =>
    arr.push({
      path: `files/${newEntry.parent}-${newEntry.id}/${file.name}`,
      name: file.name,
    })
  );
  const obj = newEntry;
  try {
    await uploadEntryFiles(obj);
    obj.files = arr;
    await setDoc(
      doc(
        db,
        "accounting",
        "chartOfAccounts",
        "accounts",
        `${obj.parent}`,
        "entries",
        `${obj.id}`
      ),
      obj
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * Upload entry files to storage
 * @param {*} entry object
 */
export const uploadEntryFiles = async (entry) => {
  try {
    const storage = getStorage();
    entry.files.forEach((file) => {
      const storageRef = ref(
        storage,
        `files/${entry.parent}-${entry.id}/` + file.name
      );
      uploadBytes(storageRef, file);
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * Download file with the profiled file path
 * @param {*} filePath string
 */
export const downloadEntryFile = async (file) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, file.path);
    // Get the download URL
    getDownloadURL(storageRef).then((url) => {
      // For the shake of not saving any file let just open it on a new window and we can decide to save it or not.
      window.open(url, "_blank");
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * This function the entry based on the parent account and the entry id
 * @returns
 */
export const getEntry = async (parent, id) => {
  try {
    const myDoc = await getDoc(
      doc(
        db,
        "accounting",
        "chartOfAccounts",
        "accounts",
        `${parent}`,
        "entries",
        `${id}`
      )
    );
    return myDoc.data();
  } catch (error) {
    console.log(error);
  }
};
/**
 * This function gets all entries at once from the parent account
 * @returns a list of all entries
 */
export const getAllEntries = async (id) => {
  try {
    const myDoc = await getDocs(
      collection(
        db,
        "accounting",
        "chartOfAccounts",
        "accounts",
        `${id}`,
        "entries"
      )
    );
    return myDoc.docs;
  } catch (error) {
    console.log(error);
  }
};
/**
 * This function gets all approved entries at once from the parent account
 * @returns a list of approved entries
 */
export const getAllApprovedEntries = async (id) => {
  try {
    const coll = collection(
      db,
      "accounting",
      "chartOfAccounts",
      "accounts",
      `${id}`,
      "entries"
    );
    const q = query(coll, where("status", "==", "Approved"));
    const myDoc = await getDocs(q);
    return myDoc.docs;
  } catch (error) {
    console.log(error);
  }
};
/**
 * This function create an entry to the database
 * @param {*} entry an object which has the date, and the content
 * of the entry such as name, date, balance, status, etc.
 * NOTICE!!!
 * The date is the id of the entry
 * Entry parent is the account id that it's associated with
 */
export const updateEntry = async (row, parent, value) => {
  try {
    await setDoc(
      doc(
        db,
        "accounting",
        "chartOfAccounts",
        "accounts",
        `${parent}`,
        "entries",
        `${row.id}`
      ),
      {
        [row.field]: value,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};
/**
 * This function create an event in the database
 * @param {*} event an event object which has the event date, previous object,
 * current object, and what has changed object
 */
export const createEntryEvent = async (event, parent) => {
  try {
    await setDoc(
      doc(
        db,
        "accounting",
        "chartOfAccounts",
        "accounts",
        `${parent}`,
        "events",
        `${event.eventDate}`
      ),
      event
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * =================================================================
 * This function gets all events related to AN ACCOUNT entries     *
 * =================================================================
 * @param {*} id
 * @returns account data
 */
export const getAllEntryEvents = async (parent) => {
  try {
    const myDoc = await getDocs(
      collection(
        db,
        "accounting",
        "chartOfAccounts",
        "accounts",
        `${parent}`,
        "events"
      )
    );
    return myDoc.docs;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function create a journal reference every time a set of entries is created.
 * @param {*} event an event object which has the event date, previous object,
 * current object, and what has changed object
 */
export const createJournal = async (journal) => {
  try {
    await setDoc(doc(db, "journal", `${journal.id}`), journal);
  } catch (error) {
    console.log(error);
  }
};
/**
 * This function gets all journals
 */
export const getJournals = async () => {
  try {
    const myDoc = await getDocs(collection(db, "journal"));
    const arr = [];
    myDoc.docs.map((d) => arr.push(d.data()));
    return arr;
  } catch (error) {
    console.log(error);
  }
};
/**
 * This function a journal with a provided id
 */
export const getJournal = async (id) => {
  try {
    const myDoc = await getDoc(doc(db, "journal", `${id}`));
    return myDoc.data();
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function updates and return pending journals everytime the user is logged in.
 */
export const updateJournalsStatus = async (id, value) => {
  try {
    await setDoc(
      doc(db, "journal", `${id}`),
      {
        status: value,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get a quick count of how many pending journal entries
 * @returns a count of how many pending journal entries
 */
export const countPendingJournals = async () => {
  try {
    const q = query(
      collection(db, "journal"),
      where("status", "==", "Pending")
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.log(error);
  }
};

/**
 * =================================================================
 * This section is dedicated for getting the ratios                =
 * =================================================================
 * The functions calculate and return the requested ratios.
 */

export const getQuickRatio = async () => {
  try {
    const currentAssets = await getAccountsBySubCat("Current Assets");
    const currentLiabilities = await getAccountsBySubCat("Current Liabilities");
    let sum1 = 0;
    let sum2 = 0;
    currentAssets
      .filter((asset) => asset.name === "Inventory")
      .forEach((asset) => (sum1 += asset.balance));
    currentLiabilities.forEach((liability) => (sum2 += liability.balance));
    return (sum1 / sum2).toFixed(2);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentRatio = async () => {
  try {
    const currentAssets = await getAccountsBySubCat("Current Assets");
    const currentLiabilities = await getAccountsBySubCat("Current Liabilities");
    let sum1 = 0;
    let sum2 = 0;
    currentAssets.forEach((asset) => (sum1 += asset.balance));
    currentLiabilities.forEach((liability) => (sum2 += liability.balance));
    return (sum1 / sum2).toFixed(2);
  } catch (error) {
    console.log(error);
  }
};
