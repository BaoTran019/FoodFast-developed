import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import { UserContext } from '../context/UserContext';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import CartItem from './components/CartItem/CartItem';
import './CheckoutPage.css';
import vnpayLogo from '../assets/checkout/vnpay.jpg';
import cash from '../assets/checkout/money.png';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Component tự động flyTo khi position thay đổi
function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position?.lat != null && position?.lng != null) {
      map.flyTo([position.lat, position.lng], 17);
    }
    // include map in deps for safety
  }, [position, map]);
  return null;
}

function CheckoutPage() {
  const { removeItem } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const { restaurantId, restaurantName, items } = location.state || {};

  if (!items || items.length === 0) {
    toast.warning("Không có món nào để thanh toán");
    return <Navigate to="/restaurants" replace />;
  }

  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const [initialOrder, setInitialOrder] = useState({
    recipientName: user?.name || '',
    recipientPhone: user?.phone || '',
    shipping_address: user?.address || '',
    payment_method: 'COD',
    restaurantId,
    restaurantName,
    status: 'pending',
    totalPrice: total,
    items: items,
    shipping_lat: null,
    shipping_lng: null,
  });

  // input address và marker position (object)
  const [addressInput, setAddressInput] = useState(user?.address || "");
  const [markerPos, setMarkerPos] = useState({ lat: 10.762622, lng: 106.682140 }); // default SG
  const mapRef = useRef(null);

  const orsKey = import.meta.env.VITE_ORS_API_KEY;

  // Hàm gọi ORS geocode (search)
  const searchAddress = async (value) => {
    const text = (value || "").trim();
    if (!text) return;

    if (!orsKey) {
      console.warn("VITE_ORS_API_KEY chưa được cấu hình");
      return;
    }

    try {
      const params = new URLSearchParams({
        api_key: orsKey,
        text,
        size: "1",
        "boundary.country": "VNM",
      });

      const res = await fetch(
        `https://api.openrouteservice.org/geocode/search?${params.toString()}`
      );

      if (!res.ok) throw new Error("ORS request failed");

      const data = await res.json();
      const feature = data?.features?.[0];

      if (!feature) {
        toast.error("Không tìm thấy vị trí cho địa chỉ này");
        return;
      }

      const [lng, lat] = feature.geometry.coordinates;

      // cập nhật marker (object)
      setMarkerPos({ lat, lng });

      // Lưu tọa độ vào initialOrder theo functional update
      setInitialOrder(prev => ({
        ...prev,
        shipping_address: text,
        shipping_lat: lat,
        shipping_lng: lng
      }));

      // focus map ngay sau khi set marker (mapRef giữ instance)
      if (mapRef.current && typeof mapRef.current.flyTo === 'function') {
        mapRef.current.flyTo([lat, lng], 17);
      }

      // debug đúng tên field
      console.log("Tọa độ tìm kiếm:", { lat, lng });
      console.log("Tọa độ cập nhật vào order: ", initialOrder.shipping_lat, initialOrder.shipping_lng)

    } catch (err) {
      console.error(err);
      toast.error("Không thể gọi API ORS");
    }
  };

  // Debounce gọi ORS khi addressInput thay đổi
  useEffect(() => {
    const timer = setTimeout(() => {
      if (addressInput.trim()) {
        searchAddress(addressInput);
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressInput]); // chỉ phụ thuộc addressInput

  // cập nhật tổng tiền khi total thay đổi
  useEffect(() => {
    setInitialOrder(prev => ({ ...prev, totalPrice: total }));
  }, [total]);

  // Nếu bạn muốn cho phép click lên bản đồ để set vị trí (và reverse geocode), ta có thể thêm sau.
  // --- SUBMIT ---
  const handleAddOrder = async (e) => {
    e.preventDefault();

    // validate lat/lng đã có không
    if (initialOrder.shipping_lat == null || initialOrder.shipping_lng == null) {
      toast.warn("Vui lòng nhập địa chỉ hợp lệ để lấy tọa độ giao hàng.");
      return;
    }

    try {
      await addOrder(initialOrder);
      for (const item of items) await removeItem(item.id);

      toast.success("Đặt hàng thành công");
      navigate('/restaurants');
    } catch (err) {
      toast.error("Có lỗi xảy ra khi đặt hàng");
      console.error(err);
    }
  };

  return (
    <div style={{ paddingBlock: '16vh', marginInline: 'auto', width: '100%' }}>
      <Row style={{ paddingRight: '0' }}>

        {/* LEFT */}
        <Col md={8}>
          <Form className='checkout-form' onSubmit={handleAddOrder}>
            <Row>
              {/* FORM */}
              <Col md={6} xs={12} className="mb-3">
                <Form.Group className='form-group'>
                  <div className='form-group-label'>Thông tin người nhận hàng</div>

                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control type='text' required
                    value={initialOrder.recipientName}
                    onChange={(e) => setInitialOrder(prev => ({ ...prev, recipientName: e.target.value }))}
                  />

                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control type='tel' required pattern="^0[0-9]{9}$"
                    value={initialOrder.recipientPhone}
                    onChange={(e) => setInitialOrder(prev => ({ ...prev, recipientPhone: e.target.value }))}
                  />

                  <Form.Label>Địa chỉ nhận hàng</Form.Label>
                  <Form.Control
                    type='text'
                    required
                    value={addressInput}
                    onChange={(e) => {
                      const v = e.target.value;
                      setAddressInput(v);
                      // chỉ cập nhật shipping_address, dùng functional update để không ghi đè lat/lng
                      setInitialOrder(prev => ({ ...prev, shipping_address: v }));
                    }}
                  />

                  <Form.Label>Phương thức thanh toán</Form.Label>
                  <Form.Select
                    value={initialOrder.payment_method}
                    onChange={(e) => setInitialOrder(prev => ({ ...prev, payment_method: e.target.value }))}
                    style={{ fontSize: 'smaller' }}
                  >
                    <option value="COD">💵 Tiền mặt</option>
                    <option value="VNPAY" disabled>💳 VNPAY (Chưa hỗ trợ)</option>
                  </Form.Select>
                </Form.Group>

                {/* PAYMENT 
                <Form.Group className='form-group mb-3'>
                  <div className='form-group-label'>Phương thức thanh toán</div>

                  <div style={{ marginBlock: '1em', display: 'flex', gap: '1em', alignItems: 'center' }}>
                    <Form.Check type='radio' name="paymentMethod" value="COD"
                      checked={initialOrder.payment_method === 'COD'}
                      onChange={(e) => setInitialOrder(prev => ({ ...prev, payment_method: e.target.value }))}
                    />
                    <Form.Label><img src={cash} style={{ height: 40 }} />Tiền mặt</Form.Label>
                  </div>

                  <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
                    <Form.Check type='radio' name="paymentMethod" value="VNPAY"
                      checked={initialOrder.payment_method === 'VNPAY'}
                      onChange={(e) => setInitialOrder(prev => ({ ...prev, payment_method: e.target.value }))}
                      disabled='true'
                    />
                    <Form.Label><img src={vnpayLogo} style={{ height: 40 }} />VNPAY</Form.Label><span>Chưa hỗ trợ</span>
                  </div>
                </Form.Group>*/}
              </Col>

              <Col md={6} xs={12}>
                {/* MAP */}
                <div style={{ height: '300px' }}>
                  <MapContainer
                    center={[markerPos.lat, markerPos.lng]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    whenCreated={(map) => (mapRef.current = map)}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Marker position={[markerPos.lat, markerPos.lng]}>
                      <Popup>
                        Tọa độ: <br /> {markerPos.lat.toFixed(6)}, {markerPos.lng.toFixed(6)}
                      </Popup>
                    </Marker>

                    <FlyToLocation position={markerPos} />
                  </MapContainer>
                </div>

                <Form.Group style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '1.8rem' }}>
                  <Button as={NavLink} to="/cart">Quay lại giỏ hàng</Button>
                  <Button type='submit' className='checkout-btn'>Hoàn tất đơn hàng</Button>
                </Form.Group>
              </Col>

            </Row>
          </Form>
        </Col>

        {/* RIGHT CART */}
        <Col md={4} className='checkout-form' style={{ padding: '1em', borderRadius: '30px' }}>
          <h3>Nhà hàng: <span style={{ color: '#ff8c09' }}>{restaurantName}</span></h3>
          <p style={{ fontSize: 'larger', borderBottom: '1px solid grey', paddingBottom: '1em' }}>
            Tổng cộng: <span style={{ fontSize: 'x-large', fontWeight: 'bold', color: '#ff8c09' }}>
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total)}
            </span>
          </p>

          {items.map((food) => (
            <CartItem key={food.id} item={food} />
          ))}

          <div style={{ marginTop: 12 }}>
            <small>Lat: {initialOrder.shipping_lat ?? 'chưa có'}</small><br />
            <small>Lng: {initialOrder.shipping_lng ?? 'chưa có'}</small>
          </div>
        </Col>

      </Row>
    </div>
  );
}

export default CheckoutPage;
