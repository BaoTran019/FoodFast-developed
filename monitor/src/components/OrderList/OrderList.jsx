import { useState, useContext } from "react"
import OrderCard from "../OrderCard/OrderCard"
import { OrdersContext } from "../../contexts/OrdersContext"

function OrderList({ status }) {
  const { filterOrders } = useContext(OrdersContext)

  const orders = filterOrders(status)
    .slice() // tạo bản sao để không mutate state gốc
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()) // mới nhất lên đầu

  return (
    <div>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

export default OrderList
