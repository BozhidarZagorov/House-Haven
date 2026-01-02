import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from "../config/firebaseinit"
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthenticated(!!currentUser);
        });

        return () => unsubscribe(); //clean up on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

//! Custom Hook to use Auth Context
export function useAuth() {
    return useContext(AuthContext);
}
