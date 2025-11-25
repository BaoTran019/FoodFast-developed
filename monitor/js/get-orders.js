import { db } from "./firebase-config";
import { collection, query, where, doc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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

export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, "orders", orderId); // tham chiếu đến document
    await updateDoc(orderRef, { status });
    console.log(`Order ${orderId} updated to status: ${status}`);
    return true;
  } catch (err) {
    console.error("Error updating order status:", err);
    return false;
  }
};