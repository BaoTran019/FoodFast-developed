import { createContext, useState, useContext, useEffect } from "react";
import { fetchOrders, updateOrderStatus, fetchAllOrders } from "../../js/get-orders";

import { AuthContext } from "./AuthenticationContext";

export const OrdersContext = createContext(null)

const OrdersProvider = ({ children }) => {

    const [orders, setOrders] = useState([])

    const { currentUser } = useContext(AuthContext)
    const uid = currentUser?.uid
    console.log('uid for orders: ', uid)

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchAllOrders(uid)
                setOrders(data)
            } catch (err) {
                console.error(err)
            }
        }; loadOrders()
    }, [uid])

    const filterOrders = (status) => {
        if (!status) return orders;
        return orders.filter(order => order.status === status);
    };

    const filterOrdersByCustomer = (customerUid) => {
        if (!customerUid) return [];
        return orders.filter(order => order.userId === customerUid);
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            // 1. Update backend / firestore
            await updateOrderStatus(orderId, newStatus);

            // 2. Update local state
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };


    return (
        <OrdersContext.Provider value={{ orders, filterOrders, updateStatus, filterOrdersByCustomer }}>
            {children}
        </OrdersContext.Provider>
    )
}

export default OrdersProvider