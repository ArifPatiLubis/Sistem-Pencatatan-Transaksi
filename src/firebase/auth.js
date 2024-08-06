import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { auth } from "./firebase";

const database = getDatabase();

export const doCreateUserWithEmailAndPassword = async (email, password, username, role = 'user') => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await set(ref(database, 'users/' + user.uid), {
            email: user.email,
            username: username,
            role: role,
            verified: false  // default verification status
        });

        return user;
    } catch (error) {
        console.error("Error creating new user:", error);
        throw error;
    }
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Ambil status verifikasi pengguna
        const snapshot = await get(ref(database, 'users/' + user.uid));
        const userData = snapshot.val();

        return {
            user,
            verified: userData.verified,
            role: userData.role
        };
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}

export const doSignInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(ref(database, 'users/' + user.uid));
        const userData = snapshot.val();

        if (!snapshot.exists()) {
            // Tambahkan pengguna baru dengan peran default (misalnya 'user')
            await set(userRef, {
                email: user.email,
                username: user.displayName,
                role: 'user',
                verified: false  
            });
        }

        return {
            user,
            verified: userData.verified,
            role: userData.role
        };
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
    }
}

export const doSignOut = () => {
    return auth.signOut();
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
}

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
}

// Fungsi untuk mendapatkan peran pengguna dari Realtime Database
export const getUserRole = async (uid) => {
    try {
        const userRef = ref(database, `users/${uid}/role`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null; // atau 'user' sebagai nilai default jika pengguna tidak ditemukan
        }
    } catch (error) {
        console.error("Error getting user role:", error);
        throw error;
    }
}
