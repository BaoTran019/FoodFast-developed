import config from './config.json'

const { SERVER_API } = config
const BASE_URL = `${SERVER_API}/api/auth`

export const logIn = async (phone, password) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password })
    })

    if (!res.ok) {
        try {
            const errData = await res.json();
            throw new Error(errData.message || "Sai số điện thoại hoặc mật khẩu");
        } catch {
            throw new Error("Sai số điện thoại hoặc mật khẩu");
        }
    }

    const data = await res.json()
    console.log("✅ Login success:", data);

    return data
}