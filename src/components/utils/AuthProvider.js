import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

/**
 * The whole purpose of this file is allowing
 * the chile components to be able to access the functions
 * within the AuthProvider
 * inside
 * to authenticate a user,
 * import useAuth()
 * const user = useAuth();
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsSignedIn(true);
    });
    return unsubscribe;
  }, []);

  return (
    <Context.Provider value={currentUser}>
      {isSignedIn && children}
    </Context.Provider>
  );
}
