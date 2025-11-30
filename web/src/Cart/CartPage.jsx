import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { CartContext } from "../context/CartContext";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const itemRemoveMessage = (itemName) => (
  <div>
    Đã xóa <span style={{ color: "#ff8c09" }}>{itemName}</span> khỏi giỏ hàng.
  </div>
);

function CartPage() {
  const { cart, updateQty, removeItem, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [openRestaurants, setOpenRestaurants] = useState({});

  if (!cart || !cart.cartItems) return <p>Không tìm thấy giỏ hàng</p>;

  const toggleRestaurant = (rid) => {
    setOpenRestaurants((prev) => ({
      ...prev,
      [rid]: !prev[rid],
    }));
  };

  // Nhóm món theo nhà hàng
  const grouped = cart.cartItems.reduce((acc, item) => {
    const rid = item.restaurantId || "unknown";
    const rname = item.restaurantName || "Nhà hàng khác";
    if (!acc[rid]) acc[rid] = { restaurantName: rname, items: [] };
    acc[rid].items.push(item);
    return acc;
  }, {});

  const total = cart.cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  const handleRemoveItem = async (item) => {
    await removeItem(item.id);
    toast.warning(itemRemoveMessage(item.name));
  };

  const handleRemoveAll = () => {
    if (!cart.cartItems || cart.cartItems.length === 0) {
      toast.error("Giỏ hàng chưa có món ăn");
    } else {
      clearCart();
      toast.error("Đã xóa tất cả khỏi giỏ hàng");
    }
  };

  const handleQty = async (id, delta) => {
    try {
      await updateQty(id, delta);
    } catch (err) {
      console.log("Lỗi cập nhật số lượng", err);
    }
  };

  const handleCheckout = (restaurantId, restaurantName, items) => {
    navigate("/checkout", {
      state: { restaurantId, restaurantName, items },
    });
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">🛒 Giỏ hàng của bạn</h2>

        {cart.cartItems.length === 0 ? (
          <p className="empty-cart">Giỏ hàng đang trống.</p>
        ) : (
          <div className="cart-items">
            {Object.entries(grouped).map(([rid, group]) => {
              const open = openRestaurants[rid] || false;
              const restaurantTotal = group.items.reduce(
                (sum, item) => sum + (item.price || 0) * item.quantity,
                0
              );

              return (
                <div key={rid} className="cart-restaurant-block">
                  <div
                    className="restaurant-header"
                    onClick={() => toggleRestaurant(rid)}
                  >
                    <div>
                      <h3>{group.restaurantName}</h3>
                      <p>
                        {group.items.length} món •{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(restaurantTotal)}
                      </p>
                    </div>
                    <span className="toggle-btn">{open ? "▲" : "▼"}</span>
                  </div>

                  {open && (
                    <div className="restaurant-items scrollable">
                      {group.items.map((item) => (
                        <div key={item.id} className="cart-item">
                          <img
                            src={item.imageUrl || "/default-food.png"}
                            alt={item.name}
                            className="cart-img"
                          />
                          <div className="cart-info">
                            <h4 className="item-name">{item.name}</h4>
                            <p className="item-price">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price || 0)}
                            </p>

                            <div className="qty-controls">
                              <button
                                onClick={() => handleQty(item.id, -1)}
                                disabled={item.quantity === 1}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button onClick={() => handleQty(item.id, 1)}>
                                +
                              </button>
                            </div>

                            <button
                              className="remove-btn"
                              onClick={() => handleRemoveItem(item)}
                            >
                              Xóa
                            </button>
                          </div>

                          <div className="cart-subtotal">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format((item.price || 0) * item.quantity)}
                          </div>
                        </div>
                      ))}

                      <div className="restaurant-actions">
                        <Button
                          className="checkout-restaurant-btn"
                          onClick={() =>
                            handleCheckout(rid, group.restaurantName, group.items)
                          }
                        >
                          Đặt hàng {group.restaurantName}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {cart.cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>
              Tổng cộng:{" "}
              <span className="total-price">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </span>
            </h3>

            <Button className="remove-all-btn" onClick={handleRemoveAll}>
              Xóa tất cả
            </Button>

            <Button className="continue-btn" onClick={() => window.scrollTo(0, 0)}>
              Tiếp tục chọn món
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
