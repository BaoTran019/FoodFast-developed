import { auth } from "./firebase-config";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

export const LogIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.log("Error login", error);
        throw error;
    }
};

export const sendForgotPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Email reset password đã được gửi!");
        return true;
    } catch (error) {
        console.log("Error sending password reset email", error);
        throw error;
    }
};
