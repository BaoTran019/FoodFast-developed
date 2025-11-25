import config from './config.json'

const { SERVER_API } = config
const BASE_URL = `${SERVER_API}/api/payments`

export const VNPay = async (orderId, totalPrice) => {
    try {
    const res = await fetch(
      `${BASE_URL}/create?orderId=${orderId}&amount=${totalPrice}&method=VNPAY`,
      { method: "POST" }
    );

    if (!res.ok) {
      throw new Error('Không thể tạo thanh toán VNPay');
    }

    return res;
  } catch (err) {
    console.error("Lỗi VNPay API:", err);
    throw err;
  }
}