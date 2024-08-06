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
    const [userVerified, setUserVerified] = useState(false); // Tambahkan status verifikasi
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeUser = async (user) => {
            if (user) {
                setCurrentUser(user);

                // Ambil role dan status verifikasi dari database
                const userRef = ref(database, `users/${user.uid}`);
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUserRole(userData.role);
                    setUserVerified(userData.verified || false);
                } else {
                    console.error("No data found for the user.");
                }

                setUserLoggedIn(true);
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
                setUserRole(null);
                setUserVerified(false); // Reset status verifikasi saat tidak ada pengguna
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
        userVerified, // Sertakan status verifikasi di value
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
