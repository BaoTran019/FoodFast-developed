import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrdersTable from './components/OrdersTable/OrdersTable'
import './Dashboard.css'
import RevenueLineChart from '../components/LineChart/LineChart'
import totalSaleIcon from '../assets/icons/total-sale.png'
import totalOrderIcon from '../assets/icons/total-order.png'
import totalDishIcon from '../assets/icons/total-dish.png'
import { OrdersContext } from '../contexts/OrdersContext'

function Dashboard() {

    const {orders} = useContext(OrdersContext)

    const totalSale = orders
        .filter(order => order.status === "completed")
        .reduce((sum, order) => sum + order.totalPrice, 0);

    const completedCount = orders.filter(order => order.status === "completed").length;



    return (
        <Container>
            <h2>Today Sales</h2>
            <Row >
                <Col xl={4} xs={12}>
                    {/* Total Sale */}
                    <div className='today-report-card total-sale'>
                        <div>
                            <img src={totalSaleIcon} style={{ width: '50px' }} />
                        </div>
                        <div style={{ display: 'block' }}>
                            <h5>Total sale</h5>
                            <h1>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalSale)}</h1>
                        </div>
                    </div>

                    {/* Total Order */}
                    <div className='today-report-card total-order'>
                        <div>
                            <img src={totalOrderIcon} style={{ height: '50px' }} />
                        </div>
                        <div style={{ display: 'block' }}>
                            <h5>Total order</h5>
                            <h1>{completedCount}</h1>
                        </div>
                    </div>
                </Col>
                {/* Total Sale */}
                <Col xl={8} className='line-chart-zone' style={{ width: '65.5%' }}>
                    <h5>Total sales</h5>
                    <RevenueLineChart />
                </Col>
            </Row>

            <h3 style={{ marginTop: '5%' }}>Recent Orders</h3>
            <div className='orders-list'>
                <OrdersTable />
            </div>

        </Container>
    )
}

export default Dashboard
