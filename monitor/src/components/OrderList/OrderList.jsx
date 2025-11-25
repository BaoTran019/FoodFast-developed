import { useState, useContext } from "react"
import OrderCard from "../OrderCard/OrderCard"
import { OrdersContext } from "../../contexts/OrdersContext"

function OrderList({status}) {

    const {filterOrders} = useContext(OrdersContext)

    const orders = filterOrders(status)

    return (
        <div>
            {orders.map(order => (
                <OrderCard order={order} />
            ))}
        </div>
    )
}

export default OrderList
