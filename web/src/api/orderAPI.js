import config from './config.json'

const { SERVER_API } = config
const BASE_URL = `${SERVER_API}/api/orders`

export const fetchOrders = async () => {
    const res = await fetch(BASE_URL);
    console.log(BASE_URL);
    if (!res.ok) throw new Error("Không lấy được orders");
    const data = await res.json();
    // Nếu data là object, bọc thành mảng
    return Array.isArray(data) ? data : [data];
};

export const addOrder = async (userId, newOrder) => {
    console.log('new-order: ', newOrder)
    console.log("Recipient:", newOrder.recipientName);
    console.log("Phone:", newOrder.recipientPhone);
    console.log("Address:", newOrder.shipping_address);
    const url = `${BASE_URL}/addFromCart/${userId}?` +
        new URLSearchParams({
            payment_method: newOrder.payment_method,
            recipientName: newOrder.recipientName,
            recipientPhone: newOrder.recipientPhone,
            shipping_address: newOrder.shipping_address,
        });
    const res = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) throw new Error("Không thể thêm orders");

    return await res.json();
};


