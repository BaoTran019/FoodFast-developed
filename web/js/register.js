import { db, auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

export const Register = async (userData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        const user = userCredential.user;

        console.log('User created: ', user.uid);

        await setDoc(doc(db, "users", user.uid), userData)

        // Tạo subcollection rỗng cartItems
        // Chỉ cần reference, không cần dữ liệu ban đầu
        const cartItemsRef = collection(db, "users", user.uid, "cartItems");
        
    } catch (error) {
        console.log("Error register", error);
        throw error;
    }
};