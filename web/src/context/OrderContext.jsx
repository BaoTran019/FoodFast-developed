import { createContext, useState, useContext, useEffect } from "react";
import { fetchOrders, updateOrderStatus } from "../../js/get-orders";
import { createOrder } from "../../js/create-order"

import { AuthenContext } from "./AuthContext";
import { CartContext } from "./CartContext";

export const OrderContext = createContext(null)

const OrderProvider = ({ children }) => {

    const [orders, setOrders] = useState([])

    const { currentUser } = useContext(AuthenContext)
    const { cart } = useContext(CartContext)
    const uid = currentUser?.uid
    console.log('uid for orders: ', uid)

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrders(uid)
                setOrders(data)
            } catch (err) {
                console.error(err)
            }
        }; loadOrders()
    }, [uid])

    const addOrder = async (initial_order) => {
        try {
            console.log(cart)
            await createOrder(uid, initial_order)
        }
        catch (err) {
            console.log('Lỗi tạo đơn hàng');
            throw err
        }
    }

    const updateStatus = async (orderId) => {
        try {
            // 1. Update backend / firestore
            await updateOrderStatus(orderId, 'completed');

            // 2. Update local state
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: 'completed' } : order
                )
            );
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            // 1. Update backend / firestore
            await updateOrderStatus(orderId, 'cancelled');

            // 2. Update local state
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: 'cancelled' } : order
                )
            );
        } catch (err) {
            console.error("Failed to cancel status:", err);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateStatus, cancelOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider