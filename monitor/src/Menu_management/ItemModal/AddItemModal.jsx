import React, { useContext, useState } from 'react'
import { Modal, Row, Col, Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { MenuContext } from '../../contexts/MenuContext';
import './ItemModal.css'

function AddItemModal({ show, handleCloseModal }) {

    const { addProduct } = useContext(MenuContext)

    const { restaurantId } = useParams();

    const [addedItem, setItem] = useState({
        name: '',
        price: 0,
        available: true,
        image: ''
    })

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            console.log('added item: ', addedItem)
            await addProduct(restaurantId, addedItem)
            handleCloseModal()
        }
        catch (err) {
            console.log(err)
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
                            <div style={{ marginBlock: '1em', display: 'flex', gap: '1em', alignItems: 'center' }}>
                                <Form.Check type='radio' name='availability' checked={addedItem.available === true}
                                    required
                                    value={true}
                                    onChange={(e) => setItem({ ...addedItem, available: true })} />
                                <Form.Label>Đưa vào bán</Form.Label>
                            </div>
                            <div style={{ marginBlock: '1em', display: 'flex', gap: '1em', alignItems: 'center' }}>
                                <Form.Check type='radio' name='availability' checked={addedItem.available === false}
                                    required
                                    value={false}
                                    onChange={(e) => setItem({ ...addedItem, available: false })} />
                                <Form.Label>Ngừng bán</Form.Label>
                            </div>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Tên món ăn</Form.Label>
                                <Form.Control type='text' placeholder='Tên gọi món ăn'
                                    onChange={(e) => setItem({ ...addedItem, name: e.target.value })}></Form.Control>
                                <Form.Label>Hình ảnh</Form.Label>
                                <Form.Control type='text' placeholder='Hình ảnh món ăn'
                                    onChange={(e) => setItem({ ...image, name: e.target.value })}></Form.Control>
                                <Form.Label>Giá tiền</Form.Label>
                                <Form.Control type='text' placeholder='Giá tiền'
                                    onChange={(e) => setItem({ ...addedItem, price: Number(e.target.value) })}></Form.Control>
                            </Form.Group>
                            <Button type='submit' style={{ marginTop: '1rem' }}>Thêm món ăn</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default AddItemModal
