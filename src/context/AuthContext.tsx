import React, { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Define the context type
interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>> | undefined;
}

// Create the Auth Context
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setCurrentUser: undefined, // Initially undefined
});

// Define the provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Replace with your app's spinner or loading indicator
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
