// context/AuthContext.js
import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../lib/firebaseConfig';
 // Adjust the path if firebaseConfig.js is in a different folder

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => auth.signInWithEmailAndPassword(email, password);
  const signout = () => auth.signOut().then(() => setUser(null));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => setUser(firebaseUser));
    return () => unsubscribe();
  }, []);

  return { user, signin, signout };
}
