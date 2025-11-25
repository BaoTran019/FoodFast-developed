import { Button } from 'react-bootstrap'
import { OrdersContext } from '../../contexts/OrdersContext'
import './OrderCard.css'
import { useContext, useState } from 'react'
import OrderDetail from '../../components/OrderItem/OrderDetail'

function OrderCard({ order }) {

  const { updateStatus } = useContext(OrdersContext)
  const [open, setOpen] = useState(false)

  const date = new Date(order.orderDate);
  const datePart = date.toLocaleDateString('vi-VN');
  const timePart = date.toLocaleTimeString('vi-VN');

  return (
    <>
      <div className={`order-card ${order.status}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4>#{order.orderId}</h4>
          <h6 style={{ fontWeight: 'lighter' }}>{`${datePart} ${timePart}`}</h6>
          <div>
            <span>{order.recipientName}</span>
            <span className="mx-2">•</span>
            <span>{order.recipientPhone}</span>
            <span className="mx-2">•</span>
            <span>{order.deliveryAddress}</span>
            <span className="mx-2">•</span>
            <span>{order.payment_method}</span>
          </div>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
          <Button className='show-detail-btn' onClick={() => setOpen(true)}>Xem đơn hàng</Button>
        </div>
      </div>

      <OrderDetail show={open} handleCloseModal={setOpen} order={order} />
    </>
  )
}

export default OrderCard
