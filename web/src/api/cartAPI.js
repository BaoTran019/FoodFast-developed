import config from './config.json'

const {SERVER_API} = config
const BASE_URL = `${SERVER_API}/api/carts`

export const getCart = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  if (!res.ok) throw new Error("Không lấy được giỏ hàng");
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
};

export const addToCartApi = async (userId, foodId, quantity) => {
  const res = await fetch(`${BASE_URL}/add/${userId}/${foodId}?quantity=${quantity}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Thêm vào giỏ hàng thất bại");
  return res.json(); 
};

export const updateQuantityApi = async (userId, productId, delta) => {
  const res = await fetch(`${BASE_URL}/update/${userId}/${productId}?delta=${delta}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Cập nhật số lượng thất bại");
  return res.json();
};

export const removeItemApi = async (userId, productId) => {
  const res = await fetch(`${BASE_URL}/removeItem/${userId}/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Xóa sản phẩm thất bại");
  return res.json();
};

export const clearCartApi = async (userId) => {
  const res = await fetch(`${BASE_URL}/clearCart/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Xóa tất cả thất bại");
  return res.text();
};



