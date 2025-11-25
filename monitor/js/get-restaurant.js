import { db } from "./firebase-config";
import { collection, query, getDocs, getDoc, doc, updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"

export const fetchRestaurant = async () => {
    try {
        const colRef = collection(db, "restaurants");
        const snapshot = await getDocs(colRef);

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        console.log(data);
        return data;
    } catch (error) {
        console.log("Error fetching restaurants: ", error);
        return [];
    }
}

export const fetchRestaurantById = async (restaurantId) => {
  try {
    const docRef = doc(db, 'restaurants', restaurantId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such restaurant!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching restaurant by id:', error);
    return null;
  }
};

export const updateRestaurantActiveStatus = async (restaurantId, isActive) => {
  try {
    const restaurantRef = doc(db, 'restaurants', restaurantId);
    await updateDoc(restaurantRef, { active: isActive });
    console.log(`Restaurant ${restaurantId} active status updated to: ${isActive}`);
    return true;
  } catch (err) {
    console.error("Error updating restaurant active status:", err);
    return false;
  }
};

export const updateRestaurantInfo = async (restaurantId, updatedData) => {
  try {
    const restaurantRef = doc(db, 'restaurants', restaurantId);
    await updateDoc(restaurantRef, updatedData);
    console.log(`Restaurant ${restaurantId} updated successfully`);
    return true;
  } catch (err) {
    console.error("Error updating restaurant info:", err);
    return false;
  }
};

export const createRestaurant = async (restaurantData) => {
  try {
    const colRef = collection(db, 'restaurants');
    const docRef = await addDoc(colRef, {
      ...restaurantData,
      active: true,        // mặc định mới tạo là active
      createdAt: new Date() // ngày tạo
    });
    console.log(`Restaurant created with ID: ${docRef.id}`);
    return { id: docRef.id, ...restaurantData };
  } catch (err) {
    console.error("Error creating restaurant:", err);
    return null;
  }
};