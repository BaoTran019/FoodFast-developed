import config from './config.json'

const { SERVER_API } = config
const BASE_URL = `${SERVER_API}/api/users`

export const getUser = async (userId) => {
    const res = await fetch(`${BASE_URL}/${userId}`)
    if (!res) throw new Error("Không lấy được user")
    const data = await res.json()
    return Array.isArray(data) ? data[0] : data;
}

export const changeInfo = async (userId, info) => {

    try {
        console.log('userId: ', userId)
        console.log('info: ', info)
        const res = await fetch(`${BASE_URL}/change-info/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
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
        throw new Error(err)
    }
}

export const changePassword = async (userId, newPassword) => {
    try {
        const res = await fetch(`${BASE_URL}/change-password/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newPassword })
        })
        if (!res) {
            throw new Error(`Error: ${res.status}`);
        }
    }
    catch (err) {
        console.log('Lỗi khi cập nhật thông tin:', err)
        throw new Error(err)
    }
}