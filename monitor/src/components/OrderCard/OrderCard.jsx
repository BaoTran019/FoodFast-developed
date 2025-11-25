import { Button } from 'react-bootstrap'
import { OrdersContext } from '../../contexts/OrdersContext'
import './OrderCard.css'
import { useContext, useState } from 'react'
import OrderDetail from '../OrderItem/OrderDetail'

function OrderCard({ order }) {

  const { updateStatus, updatePaymentStatus } = useContext(OrdersContext)
  const [open, setOpen] = useState(false)

  const handleUpdateStatus = () => {
    if (order.status === 'pending') updateStatus(order.id, 'processing')
    else if (order.status === 'processing') updateStatus(order.id, 'delivering')
    else if (order.status === 'delivering') updateStatus(order.id, 'completed')
  }

  const handleUpdatePaymentStatus = () => {
    updatePaymentStatus(order.id)
  }

  const renderStatusButton = () => {
    if (order.status === 'pending')
      return <Button className={`${order.status}-btn`} onClick={() => handleUpdateStatus()}>Accept</Button>
    else if (order.status === 'processing')
      return <Button className={`${order.status}-btn`} onClick={() => handleUpdateStatus()}>Ready for delivery</Button>
    else if (order.status === 'delivering')
      return <Button className={`${order.status}-btn`} onClick={() => handleUpdateStatus()}>Complete</Button>
  }

  const renderPaymentStatusButton = () => {
    if (order.paymentStatus === 'UNPAID')
      return <Button style={{background:'rgb(0, 187, 12)'}} onClick={() => handleUpdatePaymentStatus()}>Paid</Button>
    else 
      return <></>
    
  }

  const date = order.createdAt.toDate();  // chuyển thành JS Date
  const datePart = date.toLocaleDateString('vi-VN');
  const timePart = date.toLocaleTimeString('vi-VN');

  return (
    <>
      <div className={`order-card ${order.status}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4>#{order.id}</h4>
          <h6 style={{ fontWeight: 'lighter' }}>{`${datePart} ${timePart}`}</h6>
          <div>
            <span>{order.recipientName}</span>
            <span className="mx-2">•</span>
            <span>{order.recipientPhone}</span>
            <span className="mx-2">•</span>
            <span>{order.shipping_address}</span>
            <span className="mx-2">•</span>
            <span>{order.payment_method}</span>
          </div>
          <div>
            <span className="mx-2">•</span>
            <span>Nhà hàng: {order.restaurantName}</span>
          </div>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
          {renderPaymentStatusButton()}
          {renderStatusButton()}
          <Button className='show-detail-btn' onClick={() => setOpen(true)}>Xem đơn hàng</Button>
        </div>
      </div>

      <OrderDetail show={open} handleCloseModal={setOpen} order={order} />
    </>
  )
}

export default OrderCard
