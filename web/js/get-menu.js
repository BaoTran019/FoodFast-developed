import { db } from "./firebase-config";
import { collection, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"

export const fetchMenu = async (restaurantId) => {
    try {
        const colRef = collection(db, "restaurants", restaurantId, "menuItems");
        const snapshot = await getDocs(colRef);

        const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(items);
        return items;

    } catch (error) {
        console.log("Error fetching menu: ", error);
        return [];
    }
}

export const fetchMenuItem = async (restaurantId, menuItemId) => {
    try {
        const ref = doc(db, "restaurants", restaurantId, "menuItems", menuItemId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            return { id: snap.id, ...snap.data() };
        } else {
            return null;
        }
    } catch (err) {
        console.log("Error fetching menu: ", err);
        return [];
    }
}
