import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import "./LoginModal.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthContext } from "../../contexts/AuthenticationContext";
import { toast } from "react-toastify";

function LoginModal({ show, handleClose }) {

  const { login } = useContext(AuthContext)
  const [login_data, setLogin] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false);

  const [formType, setFormType] = useState("login"); // login | forgot | register

  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      await login(login_data.email, login_data.password)
      toast.success('Đăng nhập thành công')
    } catch (err) {
      toast.warning('Đăng nhập thất bại')
      throw err
    }
    handleClose();
  }

  const handleCloseModal = () => {
    setFormType("login"); // reset về login khi tắt
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="border-0" />

      <Modal.Body>

        {/* Tabs cho login / register */}
        {formType !== "forgot" && (
          <div className="login-tabs mb-3 text-center">
            <span
              className={`fw-bold me-4 pb-2 ${formType === "login"
                ? "border-bottom border-3 border-primary text-primary"
                : "text-muted"
                }`}
              role="button"
            >
              Đăng nhập
            </span>
          </div>
        )}

        {/* Form Đăng nhập */}
        {formType === "login" && (
          <form onSubmit={(e) => handleLogIn(e)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-3"
                placeholder="Nhập email"
                required
                value={login_data.email}
                onChange={e => setLogin({ ...login_data, email: e.target.value })}
              />
            </div>

            <div className="mb-1">
              <label className="form-label">Mật khẩu</label>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                inputMode="text"
                spellCheck="false"
                className="form-control rounded-3"
                placeholder="Nhập mật khẩu"
                required
                value={login_data.password}
                onChange={e => setLogin({ ...login_data, password: e.target.value })}
              />
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "75%",
                  right: "8%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "#666"
                }} />
            </div>

            <Button
              variant="warning"
              type="submit"
              className="w-100 fw-bold text-white"
              style={{ backgroundColor: "#ff6600", border: "none" }}
            >
              ĐĂNG NHẬP
            </Button>
          </form>
        )}

        
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
