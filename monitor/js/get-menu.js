import { db } from "./firebase-config";
import { collection, getDocs, getDoc, doc, updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"

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

export const updateMenuItemAvailability = async (restaurantId, menuItemId, isAvailable) => {
    try {
        const menuItemRef = doc(db, "restaurants", restaurantId, "menuItems", menuItemId);
        await updateDoc(menuItemRef, { available: isAvailable });
        console.log(`Menu item ${menuItemId} availability updated to: ${isAvailable}`);
        return true;
    } catch (err) {
        console.error("Error updating menu item availability:", err);
        return false;
    }
};

export const updateMenuItemInfo = async (restaurantId, menuItemId, editted_info) => {
    try {
        if (!editted_info || Object.keys(editted_info).length === 0) {
            console.warning("updateMenuItemInfo: info cannot be empty");
            return false;
        }
        const menuInfoRef = doc(db, "restaurants", restaurantId, "menuItems", menuItemId);
        await updateDoc(menuInfoRef, editted_info)
        console.log(`Menu item ${menuItemId} updated`);
        return true;
    } catch (err) {
        console.error("Error updating menu item availability:", err);
        return false;
    }
}

export const createMenuItem = async (restaurantId, data) => {
    try {
        if (!data || Object.keys(data).length === 0) {
            console.error("createMenuItem: data cannot be empty");
            return false;
        }

        const colRef = collection(db, "restaurants", restaurantId, "menuItems");
        const docRef = await addDoc(colRef, data);

        console.log("Menu item created with id:", docRef.id);
        return docRef.id;

    } catch (err) {
        console.error("Error creating menu item:", err);
        return null;
    }
}

