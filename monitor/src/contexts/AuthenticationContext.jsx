import { Children, createContext, useState, useEffect } from "react";
import { Register } from "../../js/register";
import { LogIn } from "../../js/sign-in";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { auth } from "../../js/firebase-config";


export const AuthContext = createContext()

function AuthenProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // tránh render trước khi biết user

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
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


    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthenProvider;