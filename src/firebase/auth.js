import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { auth } from "./firebase";

const database = getDatabase();

export const doCreateUserWithEmailAndPassword = async (email, password, username, role = 'user') => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save the user data with role and username to the Realtime Database
        await set(ref(database, 'users/' + user.uid), {
            email: user.email,
            username: username,
            role: role
        });

        return user;
    } catch (error) {
        console.error("Error creating new user:", error);
        throw error;
    }
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Fetch user role from database
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
        throw new Error('No role found for the user.');
    }

    const userData = snapshot.val();
    return { user, role: userData.role };
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
   
    // Periksa apakah pengguna sudah ada di database
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
        // Tambahkan pengguna baru dengan peran default (misalnya 'user')
        await set(userRef, {
            email: user.email,
            username: user.displayName,
            role: 'user'
        });
    }

    return result;
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
