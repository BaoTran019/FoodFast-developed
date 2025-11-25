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

export const setStatus = async (orderId, status) => {
    try {
        const url = `${BASE_URL}/${orderId}/status?` + 
            new URLSearchParams({status: status})

        const res = await fetch(url, {method: 'PUT'})

        if (!res.ok){
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            throw new Error(`Server returned ${res.status}`);
        }

        return await res.json();
    }
    catch (err) {
        console.error("Error Setting Order's status: ", err);
    }
}