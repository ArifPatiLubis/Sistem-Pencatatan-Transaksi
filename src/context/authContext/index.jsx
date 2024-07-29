import React, { useContext, useState, useEffect } from "react";
import { auth, database } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeUser = async (user) => {
            setCurrentUser(user);
            if (user) {
                const userRef = ref(database, `users/${user.uid}/role`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setUserRole(snapshot.val());
                } else {
                    console.error("No role found for the user.");
                }
                setUserLoggedIn(true);
            } else {
                setUserLoggedIn(false);
                setUserRole(null);
            }
            setLoading(false);
        };

        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        userLoggedIn,
        userRole,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
