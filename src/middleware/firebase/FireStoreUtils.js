import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
const { firestore } = require("../../firebase.js");
const db = firestore;

//a function to add data of new users into the database
export const createUser = async (uid, userInfo) => {
  const userName = getUserName(userInfo);

  try {
    await setDoc(doc(db, "newUsers", uid), {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      username: userName,
      email: userInfo.email,
      password: userInfo.password,
      role: "users",
    });
  } catch (error) {
    console.log(error);
  }
};

//a function to generate the username for new users
function getUserName(userInfo) {
  const date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth();
  if (month < 10) {
    month = "0" + month;
  }
  let firstLetter = userInfo.firstName.charAt(0);
  let name = firstLetter + userInfo.lastName;
  name += day + month;
  return name;
}

//a function to get a users role
export const getUserRole = async (uid) => {
  try {
    const docSnap = await getDoc(doc(db, "newUsers", uid));
    const role = docSnap.data().role;
    return role;
  } catch (error) {
    console.log(error);
  }
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

//functions to update properties of a user

//a function to update the firstName of a user
export const updateUserFirstName = async (userID, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      firstName: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};

//a function to update the lastName of a user
export const updateUserLastName = async (userID, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      lastName: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};

//a function to update the street of a user
export const updateUserStreet = async (userID, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      street: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};

//a function to update the city of a user
export const updateUserCity = async (userID, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      city: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};

//a function to update the state of a user
export const updateUserState = async (userID, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      state: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};

//a function to update the zip of a user
export const updateUserZip = async (userID, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      zip: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};

//a function to update the country of a user
export const updateUserCountry = async (userID, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      country: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};

//a function to update the phone of a user
export const updateUserPhone = async (userID, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      phone: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};

//a function to update the role of a user
export const updateUserRole = async (userID, newValue) => {
  try {
    await updateDoc(doc(db, "newUsers", userID), {
      role: newValue,
    });
  } catch (error) {
    console.log(error);
  }
};
