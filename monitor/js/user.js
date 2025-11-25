import { updatePassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { collection, getDocs, updateDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"
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

export const fetchAllUsers = async () => {
    try {
        const colRef = collection(db, "users");
        const snapshot = await getDocs(colRef);

        const users = snapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
        }));

        return users; // trả về array user
    } catch (err) {
        console.error("Error fetching users: ", err);
        return [];
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
