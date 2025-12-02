import { Button, Modal, ListGroup } from 'react-bootstrap';
import { OrdersContext } from '../../contexts/OrdersContext';
import { useContext, useState } from 'react';
import OrderDetail from '../OrderItem/OrderDetail';
import { fetchAllDrones, assignDroneToOrder } from '../../../js/drone-admin';
import './OrderCard.css'

function OrderCard({ order }) {
  const { updateStatus, updatePaymentStatus } = useContext(OrdersContext);
  const [open, setOpen] = useState(false);

  // Modal chọn drone
  const [showDroneModal, setShowDroneModal] = useState(false);
  const [idleDrones, setIdleDrones] = useState([]);
  const [selectedDroneId, setSelectedDroneId] = useState(null); // State chọn drone

  // Hàm mở modal chọn drone
  const handleOpenDroneModal = async () => {
    const drones = await fetchAllDrones();
    setIdleDrones(drones.filter(d => d.status === 'idle'));
    setSelectedDroneId(null); // reset khi mở modal
    setShowDroneModal(true);
  };

  // Assign drone và cập nhật status
  const handleAssignDroneAndDeliver = async (droneId) => {
    await assignDroneToOrder(droneId, order.id);
    await updateStatus(order.id, 'delivering'); // cập nhật status order
    setShowDroneModal(false);
    setSelectedDroneId(null);
  };

  // Cập nhật status order
  const handleUpdateStatus = () => {
    if (order.status === 'pending') updateStatus(order.id, 'processing');
    else if (order.status === 'processing') handleOpenDroneModal();
    else if (order.status === 'delivering') updateStatus(order.id, 'completed');
  };

  const handleCancelOrder = () => {
    updateStatus(order.id, 'cancelled')
  }

  const handleUpdatePaymentStatus = () => {
    updatePaymentStatus(order.id);
  };

  const renderStatusButton = () => {
    if (order.status === 'pending')
      return <Button className={`${order.status}-btn`} onClick={handleUpdateStatus}>Accept</Button>;
    else if (order.status === 'processing')
      return <Button className={`${order.status}-btn`} onClick={handleUpdateStatus}>Ready for delivery</Button>;
  };

  const renderPaymentStatusButton = () => {
    if (order.paymentStatus === 'UNPAID')
      return <Button style={{ background: 'rgb(0, 187, 12)' }} onClick={handleUpdatePaymentStatus}>Paid</Button>;
    else
      return <></>;
  };

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
          </div>
          <div>
            <span className="mx-2">•</span>
            <span>Nhà hàng: {order.restaurantName}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {order.status === 'pending' && (<Button className='cancel-btn' onClick={handleCancelOrder}>Hủy đơn hàng</Button>)}
          {renderPaymentStatusButton()}
          {renderStatusButton()}
          <Button className='show-detail-btn' onClick={() => setOpen(true)}>Xem đơn hàng</Button>
        </div>
      </div>

      <OrderDetail show={open} handleCloseModal={setOpen} order={order} />

      {/* Modal chọn drone */}
      <Modal show={showDroneModal} onHide={() => setShowDroneModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chọn drone để giao hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {idleDrones.length === 0 ? (
            <p>Không có drone nào idle!</p>
          ) : (
            <ListGroup>
              {idleDrones.map(d => (
                <ListGroup.Item
                  key={d.id}
                  action
                  active={selectedDroneId === d.id} // highlight khi chọn
                  onClick={() => setSelectedDroneId(d.id)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <span>{d.id}</span>
                  <span>Status: {d.status==="idle" ? "chuẩn bị" : ""}</span>
                  <span>Lat: {d.lat}, Lng: {d.lng}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDroneModal(false)}>Hủy</Button>
          <Button
            variant="primary"
            disabled={!selectedDroneId} // disable nếu chưa chọn drone
            onClick={async () => {
              if (!selectedDroneId) return;
              await handleAssignDroneAndDeliver(selectedDroneId);
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderCard;
