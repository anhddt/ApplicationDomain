import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { addUserProfile } from "../../middleware/data/addUserData";

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
  const [isSignedIn, setIsSignedIn] = useState(false);

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
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      navigateTo(location.state?.from || "/");
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
  const createAccount = async (userInfo, navigateTo, setError) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      addUserProfile(newUser.user.uid, userInfo);
      try {
        await signInEmailPassword(auth, userInfo.email, userInfo.password);
      } catch (error) {}
      navigateTo("/");
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
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsSignedIn(true);
    });
    return unsubscribe;
  }, []);

  const values = {
    currentUser,
    createAccount,
    signInEmailPassword,
    logOut,
  }

  return (
    <Context.Provider value={values}>
      {isSignedIn && children}
    </Context.Provider>
  );
}
