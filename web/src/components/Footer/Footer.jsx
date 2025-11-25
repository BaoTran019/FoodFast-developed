import React from 'react';
import "./Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import icon from "../../assets/logo/Icon.png"

function Footer() {
  return (
    <footer className="text-white">
      <div className="container py-3 mb-2">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <img src={icon} alt="logo" className="footer-logo" />
          </div>
          <div className="col-lg-8 col-md-8 py-3">
            <p className="logan">Fast, fresh, at your door!</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-3">
        <div className="row">
          {/* Navigator */}
          <div className="col-lg-4 col-md-4 mb-5">
            <span style={{ fontSize: "xx-large" }}>Learn more</span>
            <div className="navigator mt-3">
              <ul className="navbar-nav">
                <li className="navbar-item"><a className="nav-link" href="#">Home</a></li>
                <li className="navbar-item"><a className="nav-link" href="#">Menu</a></li>
                <li className="navbar-item"><a className="nav-link" href="#">About us</a></li>
                <li className="navbar-item"><a className="nav-link" href="#">Contact us</a></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-4 mb-5">
            <span style={{ fontSize: "xx-large" }}>Contact us</span>
            <div className="contact-info">
              <div className="align-items-center mt-4">
                <i className="bi bi-geo-fill me-3 fs-4"></i>
                <span>District 1, Ho Chi Minh City</span>
              </div>
              <div className="align-items-center mt-3">
                <i className="bi bi-telephone-fill me-3 fs-4"></i>
                <span>+84 123 456 789</span>
              </div>
              <div className="align-items-center mt-3">
                <i className="bi bi-envelope-fill me-3 fs-4"></i>
                <span>foodfastdeli@email.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
