import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { OrderContext } from '../../context/OrderContext'
import './OrderDetail.css'

function OrderDetail({ show, handleCloseModal, order }) {

  const orderItem = order.items

  const renderStatus = () => {
    if (order.status === 'pending') return <span className={order.status}>Đang chờ tiếp nhận</span>
    if (order.status === 'processing') return <span className={order.status}>Đang xử lý</span>
    if (order.status === 'delivering') return <span className={order.status}>Đang giao</span>
    if (order.status === 'completed') return <span className={order.status}>Đang giao</span>
  }

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      centered
      backdrop={true}
      keyboard={false}
      scrollable
      size="lg"
    >

      <Modal.Header closeButton style={{ backgroundColor: 'white' }}>Order: #{order.id}</Modal.Header>
      <Modal.Body style={{ backgroundColor: 'white' }}>
        <div className='order-content' style={{ fontWeight: 'lighter' }}>
          <p>Người nhận: <span style={{ color: 'black' }}>{order.recipientName}</span></p>
          <p>Nơi nhận: <span style={{ color: 'black' }}>{order.shipping_address}</span></p>
          <p>Số điện thoại: <span style={{ color: 'black' }}>{order.recipientPhone}</span></p>
          <p>Nhà hàng: <span style={{ color: 'black' }}>{order.restaurantName}</span></p>
          <p>Trạng thái: {renderStatus()}</p>
        </div>
        <div className='order-content'>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr", // cột trái rộng gấp đôi cột phải
            alignItems: "center",
            borderBottom: "1px solid lightgrey",
            fontWeight: "bold"
          }}>
            <p>Món ăn</p>
            <p>Số lượng</p>
            <p>Đơn giá</p>
          </div>
          {orderItem.map((item) => (
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr", // cột trái rộng gấp đôi cột phải
              alignItems: "center",
            }}>
              <p style={{ color: '#ff8c09' }}>{item.name}</p>
              <p>{item.quantity}</p>
              <p>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}</p>
            </div>
          ))}
        </div>
        <div>
          <p style={{ fontWeight: 'lighter', fontSize: 'large', marginTop:'20px' }}>
            Tổng cộng: <span style={{ color: 'black' }}>
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default OrderDetail
