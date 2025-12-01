// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCV8s5g7cgQSbafV65l9TyeL6FGv5pY7oQ",
    authDomain: "foodfast-ordering.firebaseapp.com",
    projectId: "foodfast-ordering",
    storageBucket: "foodfast-ordering.firebasestorage.app",
    messagingSenderId: "270525885798",
    appId: "1:270525885798:web:6c2aed1fb0aa979b576ca7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }