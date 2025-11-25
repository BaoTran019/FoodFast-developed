import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartAddressModal.css";

function CartAddressModal({ show, onClose }) {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  if (!show) return null;

  const handleConfirm = () => {
    if (!address.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }
    // Lưu địa chỉ (tạm dùng localStorage)
    localStorage.setItem("deliveryAddress", address);

    // Đóng modal
    onClose();

    // Chuyển sang giỏ hàng
    navigate("/cart");
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <h2>🚚 Nhập địa chỉ giao hàng</h2>
        <input
          type="text"
          placeholder="Nhập địa chỉ của bạn..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Hủy</button>
          <button className="btn-confirm" onClick={handleConfirm}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

export default CartAddressModal;
