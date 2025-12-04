import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import "./LoginModal.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from "../../assets/logo/logo.png";
import { AuthContext } from "../../context/AuthenticationContext"
import { AuthenContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { sendForgotPassword } from "../../../js/sign-in";

function LoginModal({ show, handleClose }) {

  const { login, register } = useContext(AuthenContext)
  const [login_data, setLogin] = useState({
    email: '',
    password: ''
  })
  const [email, setEmail] = useState("")

  const [register_info, setRegister] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: ''
  })
  const [confirmPassword, setConfirmPassword] = useState(null)

  const [showPassword, setShowPassword] = useState(false);

  const [formType, setFormType] = useState("login"); // login | forgot | register

  const switchToForm = (type) => {
    setFormType(type)
  }

  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      console.log('email', login_data.email)
      console.log('password', login_data.password)
      await login(login_data.email, login_data.password)
      toast.success('Đăng nhập thành công')
      handleClose();
    } catch (err) {
      toast.warning('Số điện thoại hoặc mật khẩu không đúng')
    }

  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    try {
      await sendForgotPassword(email)
      toast.success('Đã gửi email xác nhận')
    } catch (err) {
      toast.warning ('Có lỗi xảy ra')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log(register_info)

    if (register_info.password.length < 6) {
      toast.error("Mật khẩu phải chứa ít nhất 6 kí tự")
      return;
    }

    if (register_info.password !== confirmPassword) {
      alert("Mật khẩu không trùng khớp");
      return;
    }

    try {
      await register(register_info)
      toast.success('Đăng kí thành công')
      setFormType('login')
    } catch (err) {
      toast.warning('Đăng kí thất bại')
    } finally {
      setRegister('')
      setConfirmPassword('')
    }
  }

  const handleCloseModal = () => {
    setFormType("login"); // reset về login khi tắt
    setConfirmPassword("");
    setRegister("");
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
        {/* Logo */}
        <div className="text-center mb-1">
          <img src={logo} alt="FoodFast Logo" className="login-logo" />
        </div>

        {/* Tabs cho login / register */}
        {formType !== "forgot" && (
          <div className="login-tabs mb-3 text-center">
            <span
              className={`fw-bold me-4 pb-2 ${formType === "login"
                ? "border-bottom border-3 border-primary text-primary"
                : "text-muted"
                }`}
              role="button"
              onClick={() => switchToForm("login")}
            >
              Đăng nhập
            </span>
            <span
              className={`pb-2 ${formType === "register"
                ? "border-bottom border-3 border-primary text-primary"
                : "text-muted"
                }`}
              role="button"
              onClick={() => switchToForm("register")}
            >
              Tạo tài khoản
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

            <div className="text-end mb-3">
              <a
                href="#"
                onClick={() => switchToForm("forgot")}
                className="text-decoration-none small text-primary"
              >
                Quên mật khẩu?
              </a>
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

        {/* Form Quên mật khẩu */}
        {formType === "forgot" && (
          <form onSubmit={(e) => handleForgotPassword(e)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-3"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <Button
              variant="warning"
              type="submit"
              className="w-100 fw-bold text-white"
              style={{ backgroundColor: "#ff6600", border: "none" }}
            >
              Gửi email đổi mật khẩu
            </Button>
          </form>
        )}


        {/* Form Đăng ký */}
        {formType === "register" && (
          <form onSubmit={(e) => handleRegister(e)}>
            <div className="mb-1">
              <label className="form-label">Họ tên</label>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Nhập họ tên"
                required
                value={register_info.name}
                onChange={e => setRegister({ ...register_info, name: e.target.value })}
              />
            </div>

            <div className="mb-1">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-3"
                placeholder="Nhập email"
                required
                value={register_info.email}
                onChange={e => setRegister({ ...register_info, email: e.target.value })}
              />
            </div>

            <div className="mb-1">
              <label className="form-label">Số điện thoại</label>
              <input
                type="tel"
                className="form-control rounded-3"
                placeholder="Nhập số điện thoại"
                pattern="[0-9]{10,11}"
                required
                value={register_info.phone}
                onChange={e => setRegister({ ...register_info, phone: e.target.value })}
              />
            </div>

            <div className="mb-1">
              <label className="form-label">Địa chỉ</label>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Nhập địa chỉ"
                required
                value={register_info.address}
                onChange={e => setRegister({ ...register_info, address: e.target.value })}
              />
            </div>

            <div className="mb-1">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control rounded-3"
                placeholder="Nhập mật khẩu"
                required
                value={register_info.password}
                onChange={e => setRegister({ ...register_info, password: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Xác nhận mật khẩu</label>
              <input
                type="password"
                className="form-control rounded-3"
                placeholder="Nhập lại mật khẩu"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              variant="warning"
              type="submit"
              className="w-100 fw-bold text-white"
              style={{ backgroundColor: "#ff6600", border: "none" }}
            >
              TẠO TÀI KHOẢN
            </Button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
