import { Children, createContext, useState, useEffect } from "react";
import {
    logIn as logInAPI,
    forgotPassword as forgotPwdAPI,
    verifyOTP as verifyOTP_API,
    resetPassword as resetPassword_API,
    register as registerAPI
} from "../api/authenticationAPI";

export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ userId: '', token: '' })

    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
        }
    }, []);

    const logIn = async (phone, password) => {
        try {
            const data = await logInAPI(phone, password)
            setAuth({ userId: data.userId, token: data.token })

            localStorage.setItem(
                "auth",
                JSON.stringify({ userId: data.userId, token: data.token })
            )
        }
        catch (err) {
            throw err;
        }
    }

    const logOut = () => {
        setAuth({ userId: '', token: '' })
        localStorage.removeItem("auth");
    }

    const forgotPassword = async (forgotPhone) => {
        try {
            await forgotPwdAPI(forgotPhone)
        }
        catch (err) {
            throw new Error('Lỗi không thể yêu cầu đổi mật khẩu: ', err)
        }
    }

    const verifyOTP = async (phone, otp) => {
        try {
            await verifyOTP_API(phone, otp)
        }
        catch (err) {
            throw new Error('Lỗi xác nhận OTP: ', err)
        }
    }

    const resetPassword = async (phone, newPassword) => {
        try {
            await resetPassword_API(phone, newPassword)
        }
        catch (err) {
            throw new Error('Lỗi chỉnh sửa mật khẩu: ', err)
        }
    }

    const register = async (info) => {
        try {
            await registerAPI(info)
        }
        catch (err) {
            throw new Error('Lỗi đăng kí tài khoản: ', err)
        }
    }

    return (
        <AuthContext.Provider value={{ auth, logIn, logOut, forgotPassword, verifyOTP, resetPassword, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;