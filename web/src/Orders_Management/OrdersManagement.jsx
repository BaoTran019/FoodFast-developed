import OrderCard from "./OrderCard/OrderCard";
import { Container, Image, Button } from "react-bootstrap";
import { OrderContext } from "../context/OrderContext";
import { useContext, useState } from "react";
import emptyOrder from "../assets/icons/Empty Orders_fixed.png";
import './OrdersManagement.css'; // Thêm file CSS cho responsive

function OrdersManagement() {
    const { orders } = useContext(OrderContext);
    const [filterStatus, setFilterStatus] = useState('all');

    if (!orders) return <p>Đang tải đơn hàng...</p>;

    const filteredOrders = (filterStatus === 'all'
        ? orders
        : orders.filter(order => order.status === filterStatus)
    )
        .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()); // mới nhất lên đầu


    const statuses = ['all', 'pending', 'processing', 'delivering', 'completed', 'cancelled'];

    return (
        <Container style={{ paddingBlock: '18vh' }}>
            {/* Filter ngang */}
            <div className="filter-bar">
                {statuses.map(status => (
                    <Button
                        key={status}
                        className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                        onClick={() => setFilterStatus(status)}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                ))}
            </div>

            {filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '2em' }}>
                    <Image src={emptyOrder} style={{ height: '35vh' }} />
                </div>
            ) : (
                <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginTop: '1em' }}>
                    <h3>Các đơn hàng của bạn</h3>
                    {filteredOrders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </Container>
    );
}

export default OrdersManagement;
