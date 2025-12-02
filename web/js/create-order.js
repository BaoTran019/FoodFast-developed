import { db } from "./firebase-config";
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

export const createOrder = async (uid, initial_order) => {
    try {
        const ordersRef = collection(db, 'orders');
        const orderDoc = await addDoc(ordersRef, {
            userId: uid,
            restaurantId: initial_order.restaurantId,
            restaurantName: initial_order.restaurantName,
            items: initial_order.items,
            totalPrice: initial_order.totalPrice,
            shipping_address: initial_order.shipping_address,
            recipientName: initial_order.recipientName,
            recipientPhone: initial_order.recipientPhone,
            status: initial_order.status,
            createdAt: serverTimestamp(),
            lng: initial_order.shipping_lng,
            lat: initial_order.shipping_lat,
        });
        console.log('Order ID:', orderDoc.id);
    }
    catch (err) {
        console.log('Error create order: ', err)
        throw err
    }
};
