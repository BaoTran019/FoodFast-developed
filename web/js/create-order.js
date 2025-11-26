import { db } from "./firebase-config";
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

export const createOrder = async (uid, initial_order, cart) => {
    try {
        const ordersRef = collection(db, 'orders');
        const orderDoc = await addDoc(ordersRef, {
            userId: uid,
            restaurantId: cart.cartItems[0].restaurantId,
            restaurantName: cart.cartItems[0].restaurantName,
            items: cart.cartItems,
            totalPrice: initial_order.totalPrice,
            payment_method: initial_order.payment_method,
            shipping_address: initial_order.shipping_address,
            recipientName: initial_order.recipientName,
            recipientPhone: initial_order.recipientPhone,
            status: initial_order.status,
            createdAt: serverTimestamp()
        });
        console.log('Order ID:', orderDoc.id);
    }
    catch (err) {
        console.log('Error create order: ', err)
        throw err
    }
};
