import { createContext, useState, useContext, useEffect } from "react";
import { fetchOrders } from "../../js/get-orders";
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
            await createOrder(uid, initial_order, cart)
        }
        catch (err) {
            console.log('Lỗi tạo đơn hàng');
            throw err
        }
    }

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider