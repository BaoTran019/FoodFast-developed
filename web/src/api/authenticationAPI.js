import { address } from 'framer-motion/client'
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

export const register = async (info) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userName: info.userName,
            password: info.password,
            email: info.email, 
            address: info.address,
            phone: info.phone
        })
    })
    
    if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Không thể tạo tài khoản");
      }
}

export const forgotPassword = async (forgotPhone) => {
    const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forgotPhone })
    })
    
    if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || 'Không thể gửi mã khôi phục');
      }
}

export const verifyOTP = async (phone, otp) => {
    const res =await fetch (`${BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp })
    })
    if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || 'Không thể xác minh otp');
      }
}

export const resetPassword = async (phone, newPassword) => {
    const res = await fetch(`${BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, newPassword })
    })
    if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || 'Không thể đổi mật khẩu');
      }
}