
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Context = createContext();

export const useAuth = () =>{
    return useContext(Context);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
          setCurrentUser(user);
      });
      return unsubscribe;    
  },[])

  return (
    <Context.Provider value={currentUser}>
      {children}
    </Context.Provider>
  )
}