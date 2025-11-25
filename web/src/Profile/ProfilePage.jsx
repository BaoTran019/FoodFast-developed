import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap"
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom"
import { AuthenContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { OrderContext } from "../context/OrderContext";
import ChangePasswordModal from "./changePasswordModal";
import './ProfilePage.css'
import avatar from '../assets/avatar/chicken_avatar.jfif'

function ProfilePage() {

    const { user, changeInfo } = useContext(UserContext)
    const { logout } = useContext(AuthenContext)
    const { orders } = useContext(OrderContext)

    const [showPwd, setShowPwd] = useState(false)
    const [loading, setLoading] = useState(false)

    const completedCount = orders.length;

    const navigate = useNavigate()

    const handleLogOut = () => {
        toast.warning('Đã đăng xuất')
        logout();
        navigate('/')
        window.scrollTo(0, 0)
    }

    const [edittedInfo, setInfo] = useState({
        name: user.name,
        phone: user.phone,
        address: user.address,
        email: user.email
    });

    useEffect(() => {
        if (user && user.uid) {
            setInfo({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || '',
                email: user.email || ''
            });
        }
    }, [user]);

    const handleEditInfo = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await changeInfo(edittedInfo)
            toast.success('Chỉnh sửa thông tin thành công')
        }
        catch (err) {
            toast.error('Chỉnh sửa thông tin không thành công')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Container>
                <Row className="user-content"
                    style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center', marginBottom: '10px' }}>
                    <Col xl={4} xs={12} className="user-avatar" style={{ textAlign: 'center', marginBlock: 'auto' }}>
                        <Image
                            roundedCircle
                            src={avatar}
                            style={{ height: '300px' }}>
                        </Image>
                    </Col>
                    <Col xl={8}>
                        <Form onSubmit={handleEditInfo}>
                            <Form.Group>
                                <Form.Label>
                                    Họ tên
                                </Form.Label>
                                <Form.Control type="text" value={edittedInfo.name}
                                    onChange={(e) => setInfo({ ...edittedInfo, name: e.target.value })}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Số điện thoại
                                </Form.Label>
                                <Form.Control type="tel" value={edittedInfo.phone}
                                    onChange={(e) => setInfo({ ...edittedInfo, phone: e.target.value })}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Địa chỉ
                                </Form.Label>
                                <Form.Control type="text" value={edittedInfo.address}
                                    onChange={(e) => setInfo({ ...edittedInfo, address: e.target.value })}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control type="email" value={edittedInfo.email}
                                    onChange={(e) => setInfo({ ...edittedInfo, email: e.target.value })}></Form.Control>
                            </Form.Group>
                            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Đang lưu...' : 'Chỉnh sửa thông tin'}
                                </Button>
                                <Button onClick={() => setShowPwd(true)} style={{ background: 'red' }}>Đổi mật khẩu</Button>
                            </div>
                        </Form>
                        <div style={{ marginTop: '30px', fontSize: 'xx-large', fontWeight: 'lighter' }}>
                            Tổng số đơn hàng bạn đã đặt:&nbsp;&nbsp;
                            <span style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '3rem' }}>
                                {completedCount}
                            </span>
                            <NavLink style={{ marginLeft: '10px', fontSize: 'large', fontWeight: 'bold', color: '#ff6600' }}
                                to='/orders'>Xem chi tiết</NavLink>
                        </div>
                        <Button style={{ marginBlock: '10px' }} onClick={() => handleLogOut()}>Log out</Button>
                    </Col>
                </Row>
            </Container>

            <ChangePasswordModal show={showPwd} handleCloseModal={setShowPwd} userPassword={user.password} />
        </>
    )
}

export default ProfilePage
