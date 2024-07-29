import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCFWmzsn6rPXJvTnFyYKpF10HdwFXxFmi8",
  authDomain: "sistem-transaksi.firebaseapp.com",
  databaseURL: "https://sistem-transaksi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sistem-transaksi",
  storageBucket: "sistem-transaksi.appspot.com",
  messagingSenderId: "1085515952759",
  appId: "1:1085515952759:web:1f9f548e353b31237a8c72",
  measurementId: "G-QF1NXEJ6KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export {app, auth, database, ref, push};