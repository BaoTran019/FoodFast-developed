import React, { useContext, useEffect, useState } from 'react';
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

function CheckoutPage() {
  const { removeItem } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  // Nhận dữ liệu từ CartPage
  const { restaurantId, restaurantName, items } = location.state || {};

  if (!items || items.length === 0) {
    toast.warning("Không có món nào để thanh toán");
    return <Navigate to="/restaurants" replace />;
  }

  // Tính tổng theo items nhận được
  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  // State thông tin người nhận và order
  const [initialOrder, setInitialOrder] = useState({
    recipientName: user.name || '',
    recipientPhone: user.phone || '',
    shipping_address: user.address || '',
    payment_method: 'COD',
    restaurantId: restaurantId || '',
    restaurantName: restaurantName || '',
    status: 'pending',
    totalPrice: total,
    items: items || []
  });

  // Update total khi items thay đổi
  useEffect(() => {
    setInitialOrder(prev => ({ ...prev, totalPrice: total }));
  }, [total]);

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      await addOrder(initialOrder);
      for (const item of items) {
        await removeItem(item.id);
      }
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
        {/* CHECKOUT INFORMATION */}
        <Col md={8}>
          <Form className='checkout-form' onSubmit={handleAddOrder}>
            <Row>
              <Col md={6} xs={12} className="mb-3">
                <Form.Group className='form-group'>
                  <div className='form-group-label'>Thông tin người nhận hàng</div>
                  <Form.Label>Họ và tên <span style={{ color: 'red', fontSize: 'smaller' }}>(Bắt buộc)</span></Form.Label>
                  <Form.Control type='text' required
                    value={initialOrder.recipientName}
                    onChange={(e) => setInitialOrder({ ...initialOrder, recipientName: e.target.value })}
                  />

                  <Form.Label>Số điện thoại <span style={{ color: 'red', fontSize: 'smaller' }}>(Bắt buộc)</span></Form.Label>
                  <Form.Control type='tel' required pattern="^0[0-9]{9}$"
                    value={initialOrder.recipientPhone}
                    onChange={(e) => setInitialOrder({ ...initialOrder, recipientPhone: e.target.value })}
                  />

                  <Form.Label>Địa chỉ nhận hàng <span style={{ color: 'red', fontSize: 'smaller' }}>(Bắt buộc)</span></Form.Label>
                  <Form.Control type='text' required
                    value={initialOrder.shipping_address}
                    onChange={(e) => setInitialOrder({ ...initialOrder, shipping_address: e.target.value })}
                  />

                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control type='textarea' placeholder='Nhập ghi chú' />
                </Form.Group>
              </Col>

              <Col md={6} xs={12}>
                <Form.Group className='form-group mb-3'>
                  <div className='form-group-label'>Phương thức thanh toán</div>
                  <div style={{ marginBlock: '1em', display: 'flex', gap: '1em', alignItems: 'center' }}>
                    <Form.Check type='radio' name="paymentMethod" value="COD" required
                      checked={initialOrder.payment_method === 'COD'}
                      onChange={(e) => setInitialOrder({ ...initialOrder, payment_method: e.target.value })}
                    />
                    <Form.Label className='checkout-method-label'><img src={cash} style={{ height: '40px', marginRight: '0.8em' }} />Tiền mặt</Form.Label>
                  </div>
                  <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
                    <Form.Check type='radio' name="paymentMethod" value="VNPAY" required
                      checked={initialOrder.payment_method === 'VNPAY'}
                      onChange={(e) => setInitialOrder({ ...initialOrder, payment_method: e.target.value })}
                    />
                    <Form.Label className='checkout-method-label'><img src={vnpayLogo} style={{ height: '40px', marginRight: '0.8em' }} />VNPay</Form.Label>
                  </div>
                </Form.Group>

                <Form.Group className='confirm-section' style={{ textAlign: 'center' }}>
                  <Button className='return-to-cart-btn' as={NavLink} to="/cart">Quay lại giỏ hàng</Button>
                  <Button className='checkout-btn' type='submit'>Hoàn tất đơn hàng</Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>

        {/* CART LIST FOR CHECKOUT */}
        <Col className='checkout-form' style={{ padding: '1em', borderRadius: '30px' }}>
          <div className='checkout-form'>
            <h3>Nhà hàng: <span style={{ color: '#ff8c09' }}>{restaurantName}</span></h3>
            <p style={{ fontSize: 'larger', borderBottom: '1px solid grey', paddingBottom: '1em' }}>
              Tổng cộng: <span style={{ fontSize: 'x-large', fontWeight: 'bold', color: '#ff8c09' }}>
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total)}
              </span>
            </p>

            {items.map((food) => (
              <CartItem key={food.id} item={food} />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CheckoutPage;
