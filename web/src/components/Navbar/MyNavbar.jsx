import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import "./MyNavBar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import logo from "../../assets/logo/logo.png";
import { AuthenContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

// Import các modal
import LoginModal from "../../Login/LoginModal/LoginModal";
import Profile from '../../Profile/Profile';
import CartAddressModal from "../CartModal/CartAddressModal";

function MyNavbar({ darkMode, setDarkMode }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCartAddress, setShowCartAddress] = useState(false);

  const { currentUser } = useContext(AuthenContext)
  console.log("Auth context:", currentUser?.uid);

  const handleUserIconClick = () => {
    setShowLogin(true)
  }

  const navigate = useNavigate()

  const handleManageOrder = () => {
    if (currentUser?.uid) {
      navigate('/orders')
      window.scrollTo(0, 0)
    }
    else {
      toast.warning('Hãy đăng nhập vào tài khoản của bạn trước nhé!')
    }
  }
  const handleOpenCartPage = () => {
    if (currentUser?.uid) {
      navigate('/cart')
      window.scrollTo(0, 0)
    }
    else {
      toast.warning('Hãy đăng nhập vào tài khoản để có thể đặt hàng nhé!')
    }
  }

  return (
    <>
      <Navbar
        expand='lg'
        fixed='top'
        bg={darkMode ? "dark" : "light"}
        data-bs-theme={darkMode ? "dark" : "light"}
        className='my-navbar py-3'
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img className="img-logo" src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarNav' />
          <Navbar.Collapse id='navbarNav'>
            <Nav className='main-menu me-auto ms-auto'>
              <Nav.Link as={NavLink} to="/" onClick={() => window.scrollTo(0, 0)}>Trang chủ</Nav.Link>
              <Nav.Link as={NavLink} to="/restaurants" onClick={() => window.scrollTo(0, 0)}>Nhà hàng</Nav.Link>
              <Nav.Link onClick={() => handleManageOrder()}>Đơn hàng của bạn</Nav.Link>
            </Nav>

            {/* Menu user (login, cart, theme) */}
            <Nav className='user-menu navbar-nav me-2 ms-auto'>
              {/* Login Button */}
              {currentUser?.uid ? (
                <Nav.Link as={NavLink} to="/profile" onClick={() => window.scrollTo(0, 0)}>
                  <i className="bi bi-person"></i>
                </Nav.Link>
               ) : (
                <Nav.Link href='#' onClick={() => handleUserIconClick()}>
                  <i className="bi bi-person"></i>
                </Nav.Link>
              )
            }


              {/*Cart Button */}
              <Nav.Link onClick={() => handleOpenCartPage()}>
                <i className="bi bi-cart"></i>
              </Nav.Link>

              {/* Dark-mode Theme Button */}
              <Nav.Item className='d-flex align-items-center'>
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      <Profile show={showProfile} handleClose={() => setShowProfile(false)}></Profile>

      {/* Cart Address Modal */}
      <CartAddressModal show={showCartAddress} onClose={() => setShowCartAddress(false)} />
    </>
  )
}

export default MyNavbar;
