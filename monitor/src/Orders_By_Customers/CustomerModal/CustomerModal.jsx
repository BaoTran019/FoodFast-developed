import { useContext, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { CustomersContext } from '../../contexts/CustomersContext'
import '../../Menu_management/ItemModal/ItemModal.css'
import { toast } from 'react-toastify'

function CustomerModal({show, handleCloseModal, customer}) {
    const { changeInfo } = useContext(CustomersContext)

    const [edittedInfo, setInfo] = useState({
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        email: customer.email
    })

    const handleEditInfo = async (e) => {
        e.preventDefault();
        try {
            await changeInfo(customer.uid, edittedInfo)
            console.log('editted info: ', edittedInfo)
            handleCloseModal()
            toast.success('Chỉnh sửa thông tin thành công')
        }
        catch (err) {
            toast.error('Chỉnh sửa thông tin không thành công')
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleCloseModal}
            centered
            backdrop={true}
            keyboard={false}
            scrollable
            size="lg"
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <Form onSubmit={handleEditInfo}>

                    <Form.Group>
                        <Form.Label>Tên khách hàng</Form.Label>
                        <Form.Control type='text' value={edittedInfo.name}
                            onChange={(e) => setInfo({ ...edittedInfo, name: e.target.value })}></Form.Control>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type='tel' value={edittedInfo.phone}
                            onChange={(e) => setInfo({ ...edittedInfo, phone: Number(e.target.value) })}></Form.Control>
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type='text' value={edittedInfo.address}
                            onChange={(e) => setInfo({ ...edittedInfo, address: e.target.value })}></Form.Control>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' value={edittedInfo.email}
                            onChange={(e) => setInfo({ ...edittedInfo, email: e.target.value })}></Form.Control>
                    </Form.Group>
                    <Button type='submit' style={{ marginTop: '1rem' }}>Chỉnh sửa</Button>

                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomerModal
