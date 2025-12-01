import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { OrderContext } from '../../context/OrderContext';
import { fetchDroneByOrderId } from '../../../js/get-drones';
import './OrderDetail.css';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { completeDroneFlight } from '../../../js/get-drones';

// Custom drone icon
const droneIcon = L.icon({
  iconUrl: '/drone.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// FlyTo khi vị trí thay đổi
function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 15);
  }, [position]);
  return null;
}

// Hàm tính khoảng cách giữa 2 điểm [lat, lng] (đơn vị mét)
function distanceInMeters([lat1, lng1], [lat2, lng2]) {
  const R = 6371000; // bán kính Trái Đất
  const toRad = (deg) => deg * (Math.PI / 180);
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function OrderDetail({ show, handleCloseModal, order }) {
  const [dronePos, setDronePos] = useState(null);
  const [orderPos, setOrderPos] = useState(null);
  const [nearOrder, setNearOrder] = useState(false);
  const { updateStatus } = useContext(OrderContext);
  const [droneId, setDroneId] = useState(null)

  const orderItem = order.items;

  const renderStatus = () => {
    if (order.status === 'pending') return <span className={order.status}>Đang chờ tiếp nhận</span>
    if (order.status === 'processing') return <span className={order.status}>Đang xử lý</span>
    if (order.status === 'delivering') return <span className={order.status}>Đang giao</span>
    if (order.status === 'completed') return <span className={order.status}>Hoàn tất</span>
  }

  // Lấy drone khi modal mở và order đang giao
  useEffect(() => {
    if (!show) return;

    if (order.status === 'delivering') {
      if (order.lat != null && order.lng != null) {
        setOrderPos([order.lat, order.lng]);
      }

      fetchDroneByOrderId(order.id)
        .then(drones => {
          if (drones.length > 0) {
            const drone = drones[0];
            setDronePos([drone.lat || 0, drone.lng || 0]);
            setDroneId(drone.id)
            console.log('drone: ', drone)
          }
        })
        .catch(err => console.error(err));
    }
  }, [show, order]);

  // Kiểm tra drone gần order
  useEffect(() => {
    if (dronePos && orderPos) {
      const dist = distanceInMeters(dronePos, orderPos);
      if (dist <= 50) { // ngưỡng 50m
        setNearOrder(true);
      } else {
        setNearOrder(false);
      }
    }
  }, [dronePos, orderPos]);

  const handleConfirmOrder = () => {
    updateStatus(order.id); // ví dụ cập nhật status
    completeDroneFlight(droneId)
    setNearOrder(false);
  }

  const routePositions = dronePos && orderPos ? [dronePos, orderPos] : [];

  return (
    <Modal show={show} onHide={handleCloseModal} centered backdrop keyboard={false} scrollable size="lg">
      <Modal.Header closeButton style={{ backgroundColor: 'white' }}>
        Order: #{order.id}
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: 'white' }}>
        {/* Thông tin đơn hàng */}
        <div className='order-content' style={{ fontWeight: 'lighter' }}>
          <p>Người nhận: <span style={{ color: 'black' }}>{order.recipientName}</span></p>
          <p>Nơi nhận: <span style={{ color: 'black' }}>{order.shipping_address}</span></p>
          <p>Số điện thoại: <span style={{ color: 'black' }}>{order.recipientPhone}</span></p>
          <p>Nhà hàng: <span style={{ color: 'black' }}>{order.restaurantName}</span></p>
          <p>Trạng thái: {renderStatus()}</p>
        </div>

        {/* Món ăn */}
        <div className='order-content'>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            alignItems: "center",
            borderBottom: "1px solid lightgrey",
            fontWeight: "bold"
          }}>
            <p>Món ăn</p>
            <p>Số lượng</p>
            <p>Đơn giá</p>
          </div>
          {orderItem.map((item) => (
            <div key={item.id} style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              alignItems: "center",
            }}>
              <p style={{ color: '#ff8c09' }}>{item.name}</p>
              <p>{item.quantity}</p>
              <p>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}</p>
            </div>
          ))}
        </div>

        <p style={{ fontWeight: 'lighter', fontSize: 'large', marginTop:'20px' }}>
          Tổng cộng: <span style={{ color: 'black' }}>
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}
          </span>
        </p>

        {/* Map */}
        {order.status === 'delivering' && dronePos && orderPos && (
          <div style={{ height: '300px', marginTop: '1em' }}>
            <MapContainer center={dronePos} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={dronePos} icon={droneIcon}><Popup>Drone</Popup></Marker>
              <Marker position={orderPos}><Popup>Địa chỉ nhận</Popup></Marker>
              <Polyline positions={routePositions} color="blue" weight={3} />
              <FlyToLocation position={dronePos} />
            </MapContainer>
          </div>
        )}

        {/* Nút xác nhận đơn hàng */}
        {nearOrder && (
          <div style={{ textAlign: 'center', marginTop: '1em' }}>
            <Button onClick={handleConfirmOrder} variant="success">
              Xác nhận đơn hàng
            </Button>
          </div>
        )}

      </Modal.Body>
    </Modal>
  );
}

export default OrderDetail;
