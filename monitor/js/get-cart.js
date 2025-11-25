import { db } from "./firebase-config";
import { collection, getDocs, getDoc, doc, setDoc, increment, deleteDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"

export const fetchCartItems = async (uid) => {
    try {
        const colRef = collection(db, "users", uid, "cartItems");
        const snapshot = await getDocs(colRef);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    } catch (error) {
        console.log("Error fetching cart items: ", error);
        return [];
    }
}

export const addToCart = async (uid, product, restaurantId, restaurantName) => {
    const itemRef = doc(db, "users", uid, "cartItems", product.id);
    const itemSnap = await getDoc(itemRef);

    if (itemSnap.exists()) {
        // tăng quantity
        await setDoc(itemRef, { quantity: increment(1) }, { merge: true });
    } else {
        // tạo mới
        await setDoc(itemRef, { ...product, quantity: 1, restaurantId: restaurantId, restaurantName: restaurantName });
    }
};


export const updateCartItemQty = async (uid, productId, delta) => {
    console.error("updateCartItemQty: uid hoặc productId undefined", uid, productId);
    const itemRef = doc(db, "users", uid, "cartItems", productId);
    const itemSnap = await getDoc(itemRef);

    if (!itemSnap.exists()) return; // item chưa có → không làm gì

    const currentQty = itemSnap.data().quantity || 1;
    const newQty = currentQty + delta;

    if (newQty <= 0) {
        await deleteDoc(itemRef); // nếu giảm xuống 0 → xóa món
    } else {
        await setDoc(itemRef, { quantity: increment(delta) }, { merge: true });
    }
};


export const removeCartItem = async (uid, productId) => {
    const itemRef = doc(db, "users", uid, "cartItems", productId);
    await deleteDoc(itemRef);
};


export const clearCart = async (uid) => {
    const colRef = collection(db, "users", uid, "cartItems");
    const snapshot = await getDocs(colRef);
    snapshot.docs.forEach(doc => deleteDoc(doc.ref));
};