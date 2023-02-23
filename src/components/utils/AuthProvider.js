import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../middleware/firebase/firebase";
import { getUserProfile, setUserProfile } from "../../middleware/firebase/FireStoreUtils";

/**
 * The whole purpose of this file is allowing
 * the chile components to be able to access the functions
 * within the AuthProvider
 * inside
 * to authenticate a user,
 * import useAuth()
 * const { user } = useAuth();
 * The user is in form of a dictionary returned from firebase,
 */

/**
 * The use of createContext allows the useAuth to access the variables
 * inside Auth provider.
 * Depend on what goes inside value at line 55
 * That variable(s) can be accessed.
 * If there are multiple variables
 * we can add a collection of variable in form of a dictionary to value
 * For example exportedValues = { currentUser, abc, xyz};
 * value ={exportedValues}
 * import useAuth()
 * const { currentUser or abc or xyz } = useAuth();
 * We can also access many or all of them like so:
 * const { currentUser, abc, xyz } = useAuth();
 */
const Context = createContext();

export const useAuth = () => {
  return useContext(Context);
};

/**
 * The AuthProvider is used at the top level of the app component.
 * There is no other need to import this component
 * import useAuth() instead.
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isNotSignedIn, setIsNotSignedIn] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  /**
   * What this function does is sign helping the user
   * to sign in with the email and passsword
   * then redirect to the index page, which is "/".
   *
   * It takes in a dictionary collection of email and password,
   * a function, and another function
   */
  const signInEmailPassword = async (
    inputs,
    setError,
    navigateTo,
    location
  ) => {
    try {
      const loginToken = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      if(!auth.currentUser.emailVerified){
        throw new Error();
      }
      try {
        const profile = await getUserProfile(loginToken.user.uid);
        if (!profile.isDisabled){
          navigateTo(location.state?.from || "/")
        } else {
          throw new Error();
        }
      } catch (error) {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  /**
   * What this function does is sign helping the user
   * to create an account with the email and passsword
   * then redirect back to the login page,
   * so the user can login
   *
   * It takes in the email, password, a function, and another function
   */
  const createAccount = async (userInfo, setError) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      setUserProfile(newUser.user.uid, userInfo);
      try {
        await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        try {
          await sendEmailVerification(auth.currentUser);
          signOut(auth);
        } catch (error) {}
      } catch (error) {}
    } catch (error) {
      setError(true);
    }
  };

  /**
   * This functions logs the user out of the system
   * Just import it and call it as it is, logOut();
   */
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };
  
  //useEffects triggers everytime the user logs in or out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const userProfile = await getUserProfile(user.uid);
        if(user.emailVerified && !userProfile.isDisabled) {
          setCurrentUser(user)
          setUserInfo(userProfile);
        } else throw new Error();
      } catch (error) {
        logOut(auth);
        setCurrentUser();
      } 
      setIsNotSignedIn(false);
    });
    return unsubscribe;
  }, []);

  const firstName = userInfo.firstName;
  const lastName = userInfo.lastName;
  const phone = userInfo.phone;
  const street = userInfo.street;
  const city = userInfo.city;
  const state = userInfo.state;
  const zip = userInfo.zip;
  const country = userInfo.country;
  const role = userInfo.role;
  const username = userInfo.username;
  const email = userInfo.email;
  const passsword = userInfo.passsword;
  const dateCreated = userInfo.dateCreated;
  const isDisabled = userInfo.isDisabled;

  const values = {
    userInfo,
    firstName,
    lastName,
    phone,
    street,
    city,
    state,
    zip,
    country,
    role,
    username,
    email,
    passsword,
    currentUser,
    dateCreated,
    isDisabled,
    createAccount,
    signInEmailPassword,
    logOut,
  };

  return (
    <Context.Provider value={values}>{!isNotSignedIn && children}</Context.Provider>
  );
}
