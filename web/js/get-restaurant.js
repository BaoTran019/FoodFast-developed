import { db } from "./firebase-config";
import { collection, query, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"

export const fetchRestaurant = async () => {
    try {
        const colRef = collection(db, "restaurants");
        const snapshot = await getDocs(colRef);

        // Lọc những nhà hàng active
        const data = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(restaurant => restaurant.active === true);

        console.log("Active restaurants:", data);
        return data;
    } catch (error) {
        console.log("Error fetching restaurants: ", error);
        return [];
    }
};

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
