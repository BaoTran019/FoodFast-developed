import React, { useState, useEffect, useContext } from "react";
import { OrdersContext } from "../../../contexts/OrdersContext";
import './OrdersTable.css'

function OrdersTable() {
    const {orders, filterOrders} = useContext(OrdersContext)

    const order = filterOrders('pending')

    return (
        <div className="order-table-container">
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total (VNĐ)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.recipientName}</td>
                            <td>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}</td>
                            <td className={`${order.status}`}>
                                {order.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrdersTable;
