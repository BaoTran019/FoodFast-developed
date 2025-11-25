import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home/Home";
import Restaurant from './Views/Restaurant/Restaurant';
import Menu from './Views/Menu/Menu';
import CartPage from './Cart/CartPage';
import CheckoutPage from './Checkout/CheckoutPage';
import ProfilePage from './Profile/ProfilePage';
import Footer from "./components/Footer/Footer";
import MyNavbar from "./components/Navbar/MyNavbar";
import OrdersManagement from './Orders_Management/OrdersManagement';
import { ToastContainer } from "react-toastify";
import './App.css'


function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className='app' data-bs-theme={darkMode ? "dark" : "light"}>
      <MyNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu/:restaurantId" element={<Menu />} />
        <Route path="/restaurants" element={<Restaurant />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersManagement />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
