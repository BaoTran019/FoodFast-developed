import './OrderCard.css'
import { useState } from 'react'
import OrderDetail from '../OrderItem/OrderDetail'

function OrderCard({ order }) {

  const [open, setOpen] = useState(false)

  const renderStatus = () => {
    if (order.status === 'pending')
      return <h5 className={`customed-header-6 status ${order.status}`}>{order.status}</h5>
    else if (order.status === 'processing')
      return <h5 className={`customed-header-6 status ${order.status}`}>{order.status}</h5>
    else if (order.status === 'delivering')
      return <h5 className={`customed-header-6 status ${order.status}`}>{order.status}</h5>
    else if (order.status === 'completed')
      return <h5 className={`customed-header-6 status ${order.status}`}>{order.status}</h5>
  }

  const date = order.createdAt.toDate();  // chuyển thành JS Date
  const datePart = date.toLocaleDateString('vi-VN');
  const timePart = date.toLocaleTimeString('vi-VN');

  return (
    <>
      <div className={`order-card ${order.status}`} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
        onClick={() => setOpen(true)}>
        <h5 className='customed-header-4'><span style={{ fontWeight: 'lighter' }}>Order id: </span>#{order.id}</h5>
        <h6 className='customed-header-6' style={{ marginInline: '0.8rem' }}>•</h6>
        <h5 className='customed-header-6' style={{ fontWeight: 'lighter' }}><span>Date: </span>{`${datePart} ${timePart}`}</h5>
        <h6 className='customed-header-6' style={{ marginInline: '0.8rem' }}>•</h6>
        <h5 className='customed-header-6' style={{ fontWeight: 'lighter' }}>
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}
        </h5>
        <h6 className='customed-header-6' style={{ marginInline: '0.8rem' }}>•</h6>
        <h5 className='customed-header-6' style={{ fontWeight: 'lighter' }}>{order.payment_method}</h5>
        <h6 className='customed-header-6' style={{ marginInline: '0.8rem' }}>•</h6>
        {renderStatus()}
      </div>

      <OrderDetail show={open} handleCloseModal={setOpen} order={order} />
    </>
  )
}

export default OrderCard
