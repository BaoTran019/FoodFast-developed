import { createContext, useState, useContext, useEffect } from "react";
import { AuthenContext } from "./AuthContext";
import { fetchUser, changePassword as FBChangePwd, changeInfo as changeInfoAPI } from "../../js/user";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ uid: '', name: '', password: '', email: '', phone: '', address: '' });
  const { currentUser } = useContext(AuthenContext);
  const uid = currentUser?.uid;

  const [loading, setLoading] = useState(true);

  // Load user lần đầu
  useEffect(() => {
    const loadUser = async () => {
      if (!uid) return setLoading(false);
      try {
        const data = await fetchUser(uid);
        if (data) setUser(data);
      } catch (err) {
        console.log("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [uid]);

  // Cập nhật thông tin local + Firestore
  const changeInfo = async (info) => {
    try {
      await changeInfoAPI(uid, info);          // update Firestore
      setUser(prev => ({ ...prev, ...info })); // update state local ngay
    } catch (err) {
      console.log('Cannot update info', err);
    }
  };

  const changePassword = async (newPassword) => {
    try {
      await FBChangePwd(newPassword);
    } catch (err) {
      console.log('Cannot change password', err);
      throw err
    }
  };

  return (
    <UserContext.Provider value={{ user, changeInfo, changePassword, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
