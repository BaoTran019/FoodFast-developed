import { db } from "./firebase-config";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

export const fetchOrders = async (uid) => {
    try {
        const colRef = collection(db, "orders");
        const q = query(colRef, where("userId", "==", uid));

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.log("Error fetching cart items: ", error);
        return [];
    }
}