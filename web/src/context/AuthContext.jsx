import { Children, createContext, useState, useEffect } from "react";
import { Register } from "../../js/register";
import { LogIn } from "../../js/sign-in";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { auth } from "../../js/firebase-config";


export const AuthenContext = createContext()

function AuthenProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);

    // Lắng nghe trạng thái login/logout
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user); // user.uid có ở đây
                console.log('current user: ', user.uid)
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            await LogIn(email, password)
        }
        catch (err) {
            throw new Error ('Lỗi đăng nhập tài khoản: ', err)
        }
    }

    const register = async (userData) => {
        try {
            await Register(userData)
        }
        catch (err) {
            throw new Error('Lỗi đăng kí tài khoản: ', err)
        }
    }

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthenContext.Provider value={{ currentUser, login, register, logout }}>
            {children}
        </AuthenContext.Provider>
    )
}

export default AuthenProvider;