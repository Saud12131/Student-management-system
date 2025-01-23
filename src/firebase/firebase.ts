// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAN3C4vzLY2g2MusLC8OGGTgTEx8ZE7mys",
    authDomain: "react-app-357a4.firebaseapp.com",
    projectId: "react-app-357a4",
    storageBucket: "react-app-357a4.firebasestorage.app",
    messagingSenderId: "887075245209",
    appId: "1:887075245209:web:f4c9256233309815127c08",
    measurementId: "G-90B1MFBSRQ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);