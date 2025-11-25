import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthenticationContext";
import { toast } from "react-toastify";

function Profile({ show, handleClose }) {

    const { auth, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        toast.warning('Đã đăng xuất')
        logOut();
        handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Thông tin tài khoản</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p><strong>Mã người dùng:</strong> {auth.userId}</p>
                <p>Xin chào, khách hàng thân thiết của chúng tôi! 👋</p>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                >
                    Đóng
                </Button>
                <Button
                    variant="danger"
                    onClick={handleLogOut}
                >
                    Đăng xuất
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Profile
