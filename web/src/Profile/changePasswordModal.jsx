import React, { useState, useContext, useRef } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'

function ChangePasswordModal({ show, handleCloseModal, userPassword }) {

    const { changePassword } = useContext(UserContext)

    const [checkPassword, setCheckPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState({ checkPassword: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false)


    // Tạo ref để focus
    const checkPwdRef = useRef(null)
    const newPwdRef = useRef(null)
    const confirmPwdRef = useRef(null)


    const handleChangePwd = async (e) => {
        e.preventDefault();
        let hasError = false;

        const newError = { checkPassword: '', newPassword: '', confirmPassword: '' }
        setLoading(true)

        if (checkPassword !== userPassword) {
            newError.checkPassword = 'Mật khẩu cũ không đúng'
            checkPwdRef.current.focus()
            hasError = true
        }

        if (newPassword.length < 6) {
            toast.error("Mật khẩu phải chứa ít nhất 6 kí tự")
            return;
        }

        if (newPassword.trim() === '') {
            newError.newPassword = 'Vui lòng nhập mật khẩu mới'
            newPwdRef.current.focus()
            hasError = true
        }
        if (confirmPassword.trim() === '') {
            newError.confirmPassword = 'Vui lòng xác nhận mật khẩu'
            if (!hasError) confirmPwdRef.current.focus()
            hasError = true
        }

        // Kiểm tra trùng
        if (newPassword !== confirmPassword) {
            newError.confirmPassword = 'Mật khẩu xác nhận không trùng khớp'
            if (!hasError) confirmPwdRef.current.focus()
            hasError = true
        }

        setError(newError)

        if (hasError) return

        try {
            await changePassword(confirmPassword)
            toast.success('Đổi mật khẩu thành công')
            handleCloseModal()
        }
        catch (err) {
            if (err.code === 'auth/requires-recent-login') {
                toast.error('Vui lòng đăng nhập lại trước khi đổi mật khẩu.');
            }
            else toast.error('Đổi mật khẩu không thành công');
            return
        }
        finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setNewPassword('');
        setConfirmPassword('');
        setError({ newPassword: '', confirmPassword: '', otp: '' });
    };

    const closeModal = () => {
        resetForm();
        handleCloseModal();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={closeModal}
                centered
                backdrop={true}
                keyboard={false}
                scrollable
                size="xl"
            >
                <ModalHeader closeButton>
                    Đổi mật khẩu mới
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleChangePwd}>
                        <FormGroup>
                            <FormLabel>Nhập mật khẩu cũ</FormLabel>
                            <FormControl type='password'
                                value={checkPassword}
                                ref={checkPwdRef}
                                onChange={(e) => setCheckPassword(e.target.value)}
                                placeholder='Nhập mật khẩu cũ'
                                isInvalid={!!error.newPassword} />
                            <Form.Control.Feedback type="invalid">
                                {error.checkPassword}
                            </Form.Control.Feedback>

                            <FormLabel>Nhập mật khẩu mới</FormLabel>
                            <FormControl type='password'
                                value={newPassword}
                                ref={newPwdRef}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder='Nhập mật khẩu mới'
                                isInvalid={!!error.newPassword} />
                            <Form.Control.Feedback type="invalid">
                                {error.newPassword}
                            </Form.Control.Feedback>

                            <FormLabel>Xác nhận lại mật khẩu</FormLabel>
                            <FormControl type='password'
                                value={confirmPassword}
                                ref={confirmPwdRef}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Nhập lại mật khẩu 1 lần nữa'
                                isInvalid={!!error.confirmPassword} />
                            <Form.Control.Feedback type="invalid">
                                {error.confirmPassword}
                            </Form.Control.Feedback>
                        </FormGroup>
                        <Button style={{ marginTop: '10px' }} type='submit' disabled={loading}>
                            {loading ? 'Đang lưu' : 'Đổi mật khẩu'}
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ChangePasswordModal
