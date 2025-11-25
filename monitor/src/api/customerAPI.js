import config from './config.json'

const { SERVER_API } = config;
const BASE_URL = `${SERVER_API}/api/users`;

export const fetchCustomers = async () => {
    try {
        const res = await fetch(BASE_URL)

        if (!res.ok) {
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            throw new Error(`Server returned ${res.status}`);
        }

        const data = await res.json();
        console.log(data)

        // Trả về luôn mảng rỗng nếu dữ liệu null để tránh crash ở FE
        return Array.isArray(data) ? data : [];

    }
    catch (err) {
        console.error("Error fetching user:", err);
        return [];
    }
}

export const changeInfo = async (userId, info) => {

    const auth = JSON.parse(localStorage.getItem("auth"))
    const token = auth?.token

    try {
        console.log('userId: ',userId)
        console.log('info: ',info)
        const res = await fetch(`${BASE_URL}/change-info/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                fullName: info.fullName,
                phone: info.phone,
                address: info.address,
                email: info.email
            }), // gửi object info
        })

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
    }

    catch (err) {
        console.log('Lỗi khi cập nhật thông tin:', err)
        throw err
    }
}