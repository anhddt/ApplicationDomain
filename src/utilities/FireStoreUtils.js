import { collection, doc , setDoc, getDocs, updateDoc } from 'firebase/firestore';
const {firestore} = require("../firebase.js");
const db = firestore;
const usersRef = collection(db, 'Users');

//a function to add data of new users into the database
//titles user docs based on usernames for easy search/sorting
export const createUser = async (uid, userInfo) => {
	const userName = getUserName(userInfo);
	userInfo.username = userName;
	userInfo.role = "user";
	try {
		await setDoc(doc(db, "newUsers", userName, uid), userInfo);
		console.log("created doc");
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

//a function to retrieve the data of current users
export const getUsers = async () => {
	try {
		let data;
		const querySnapshot = await getDocs(collection(db, "newUsers"));
		querySnapshot.forEach((doc) => {
				data.doc.id = doc.data;
		});
		return data;
	} catch (error) {
		console.log(error);
	}
}

//functions to update properties of a user

//a function to update the firstName of a user
export const updateUserFirstName = async (userID, newValue) => {
		try {
			await updateDoc(doc(db, "newUsers", userID), {
				firstName: newValue
		});
	} catch (error) {
		console.log(error);
	}
}

//a function to update the lastName of a user
export const updateUserLastName = async (userID, newValue) => {
	try {
		await updateDoc(doc(db, "newUsers", userID), {
			lastName: newValue
		});
	} catch (error) {
		console.log(error);
	}
}

//a function to update the street of a user
export const updateUserStreet = async (userID, newValue) => {
	try {
		await updateDoc(doc(db, "newUsers", userID), {
			street: newValue
		});
	} catch (error) {
		console.log(error);
	}
}

//a function to update the city of a user
export const updateUserCity = async (userID, newValue) => {
	try {
		await updateDoc(doc(db, "newUsers", userID), {
			city: newValue
		});
	} catch (error) {
		console.log(error);
	}
}

//a function to update the state of a user
export const updateUserState = async (userID, newValue) => {
	try {
		await updateDoc(doc(db, "newUsers", userID), {
			state: newValue
		});
	} catch (error) {
		console.log(error);
	}
}

//a function to update the zip of a user
export const updateUserZip = async (userID, newValue) => {
	try {
		await updateDoc(doc(db, "newUsers", userID), {
			zip: newValue
		});
	} catch (error) {
		console.log(error);
	}
}

//a function to update the country of a user
export const updateUserCountry = async (userID, newValue) => {
	try {
		await updateDoc(doc(db, "newUsers", userID), {
			country: newValue
		});
	} catch (error) {
		console.log(error);
	}
}

//a function to update the phone of a user
export const updateUserPhone = async (userID, newValue) => {
	try {
		await updateDoc(doc(db, "newUsers", userID), {
			phone: newValue
		});
	} catch (error) {
		console.log(error);
	}
}

//a function to update the role of a user
export const updateUserRole = async (userID, newValue) => {
	try {
		await updateDoc(doc(db, "newUsers", userID), {
			role: newValue
		});
	} catch (error) {
		console.log(error);
	}
}