import React, { useContext, useState } from 'react'
import { Modal, Row, Col, Button, Form } from 'react-bootstrap'
import './ItemModal.css'
import { RestaurantContext } from '../../contexts/Restaurant'

function AddRestModal({ show, handleCloseModal }) {

    const { addRestaurant } = useContext(RestaurantContext)

    const [res, setRes] = useState({
        name: '',
        phone: '',
        address: '',
        active: true,
        rating: 0
    })

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            console.log('added item: ', res)
            await addRestaurant(res)
            handleCloseModal()
        }
        catch (err) {
            window.alert('Không thể thêm món ăn')
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
                <Form onSubmit={handleAddProduct}>
                    <Row>
                        <Col xl={4}>
                            <div>
                                <img alt='Thêm hình ảnh' style={{ height: 'auto', width: '250px' }}></img>
                            </div>
                            <input type="file" />
                            <div style={{ marginBlock: '1em', display: 'flex', gap: '1em', alignItems: 'center' }}>
                                <Form.Check type='radio' name='availability' checked={res.active === true}
                                    required
                                    value={true}
                                    onChange={(e) => setRes({ ...res, active: true })} />
                                <Form.Label>Đưa vào hoạt động</Form.Label>
                            </div>
                            <div style={{ marginBlock: '1em', display: 'flex', gap: '1em', alignItems: 'center' }}>
                                <Form.Check type='radio' name='availability' checked={res.active === false}
                                    required
                                    value={false}
                                    onChange={(e) => setRes({ ...res, active: false })} />
                                <Form.Label>Ngưng hoạt động</Form.Label>
                            </div>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Tên nhà hàng</Form.Label>
                                <Form.Control type='text' placeholder='Tên gọi nhà hàng'
                                    onChange={(e) => setRes({ ...res, name: e.target.value })}></Form.Control>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type='text' placeholder='Số điện thoại nhà hàng'
                                    onChange={(e) => setRes({ ...res, phone: e.target.value })}></Form.Control>
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type='text' placeholder='Địa chỉ nhà hàng'
                                    onChange={(e) => setRes({ ...res, address: e.target.value })}></Form.Control>
                                <Form.Label>Xếp hạng</Form.Label>
                                <Form.Control type='text' placeholder='Xếp hạng'
                                    onChange={(e) => setRes({ ...res, rating: e.target.value })}></Form.Control>

                            </Form.Group>
                            <Button type='submit' style={{ marginTop: '1rem' }}>Thêm nhà hàng</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default AddRestModal
