import { useState, useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import SideBar from './components/SideBar/SideBar'
import Dashboard from './Dashboard/Dashboard'
import Orders_page from './Orders/Orders_page';
import MenuManage_page from './Menu_management/MenuManage_page';
import Customers from './Orders_By_Customers/Customers';
import Orders_By_Customers from './Orders_By_Customers/Orders_By_Customers';
import Restaurant from './Restaurants/Restaurant';
import { AuthContext } from './contexts/AuthenticationContext';
import LoginModal from './Login/LoginModal/LoginModal';
import { ToastContainer } from "react-toastify";
import './App.css'

function App() {

  const { currentUser, loading } = useContext(AuthContext);

  if (loading) return <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>Loading...</div>;
  console.log(currentUser)

  // Modal login
  const [showLogin, setShowLogin] = useState(false);

  // PrivateRoute để bảo vệ các page
  const PrivateRoute = ({ children }) => {
    if (!currentUser?.uid) {
      setShowLogin(true); // bật modal nếu chưa login
      return null;
    }
    return children;
  }


  return (
    <div className='app' style={{ paddingLeft: '20%', paddingRight: '30px', paddingBlock: '40px' }}>

      <SideBar />
      <Routes>
        <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
        <Route path='/Orders' element={<PrivateRoute><Orders_page /></PrivateRoute>}></Route>
        <Route path='/Restaurants' element={<PrivateRoute><Restaurant /></PrivateRoute>}></Route>
        <Route path='/Menu/:restaurantId' element={<PrivateRoute><MenuManage_page /></PrivateRoute>}></Route>
        <Route path='/Customers' element={<PrivateRoute><Customers /></PrivateRoute>}></Route>
        <Route path="/orders_by_customers/:uid" element={<PrivateRoute><Orders_By_Customers /></PrivateRoute>}></Route>
      </Routes>


      <ToastContainer />


      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          show={showLogin}              
          handleClose={() => setShowLogin(false)}
        />
      )}
    </div>
  )
}

export default App
