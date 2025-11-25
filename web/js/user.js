import { updatePassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { updateDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"
import { db, auth } from "./firebase-config";

export const fetchUser = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { uid: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such user!");
            return null;
        }
    } catch (err) {
        console.log("Error fetch user data: ", err);
        return null;
    }
};

export const changePassword = async (newPassword) => {
    try {
        await updatePassword(auth.currentUser, newPassword);
        console.log("Password updated!");
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { password: newPassword });
        console.log("Password updated in Firestore!");
    } catch (error) {
        console.log("Error updating password:", error);
        throw error;
    }
};

export const changeInfo = async (uid, info) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, info);
        console.log("User info updated!");
    } catch (err) {
        console.log("Error updating user info:", err);
        throw err;
    }
};
