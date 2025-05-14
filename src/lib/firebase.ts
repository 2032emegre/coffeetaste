import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDN693u3v6WD0d5jNo00aflS-SHTUgax9M",
    authDomain: "coffee-mytaste.firebaseapp.com",
    projectId: "coffee-mytaste",
    storageBucket: "coffee-mytaste.firebasestorage.app",
    messagingSenderId: "468762161487",
    appId: "1:468762161487:web:c2bd1670818678654d553a",
    measurementId: "G-45JFFR6SVQ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db }; 