import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Modal, Row, Col, Button, Form } from 'react-bootstrap'
import './ItemModal.css'
import { MenuContext } from '../../contexts/MenuContext'

function ItemModal({ show, handleCloseModal, item }) {

    const { restaurantId } = useParams();
    const { editInfo } = useContext(MenuContext)

    const [edittedItem, setItem] = useState({
        id: item.id,
        name: item.name,
        price: item.price,
        available: item.available,
        image: item.image
    })

    const handleEditInfo = async (e) => {
        e.preventDefault();
        try {
            await editInfo(restaurantId, item.id, edittedItem)
            console.log('editted item: ', edittedItem)
            handleCloseModal()
        }
        catch (err) {
            window.alert('Không thể chỉnh sửa món ăn')
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
                    <Row>

                        <Col xl={4}>

                            <div style={{ marginBlock: '1em', display: 'flex', gap: '1em', alignItems: 'center' }}>
                                <Form.Check type='radio' name='availability' checked={edittedItem.available === true}
                                    required
                                    value={true}
                                    onChange={(e) => setItem({ ...edittedItem, available: true })} />
                                <Form.Label>Đưa vào bán</Form.Label>
                            </div>
                            <div style={{ marginBlock: '1em', display: 'flex', gap: '1em', alignItems: 'center' }}>
                                <Form.Check type='radio' name='availability' checked={edittedItem.available === false}
                                    required
                                    value={false}
                                    onChange={(e) => setItem({ ...edittedItem, available: false })} />
                                <Form.Label>Ngừng bán</Form.Label>
                            </div>
                        </Col>


                        <Col>
                            <Form.Group>
                                <Form.Label>Tên món ăn</Form.Label>
                                <Form.Control type='text' value={edittedItem.name}
                                    onChange={(e) => setItem({ ...edittedItem, name: e.target.value })}></Form.Control>
                                <Form.Label>Giá tiền</Form.Label>
                                <Form.Control type='text' value={edittedItem.price}
                                    onChange={(e) => setItem({ ...edittedItem, price: Number(e.target.value) })}></Form.Control>
                                <Form.Control
                                    type='text'
                                    placeholder='Hình ảnh món ăn'
                                    value={edittedItem.image}
                                    onChange={(e) => setItem({ ...edittedItem, image: e.target.value })}
                                />

                            </Form.Group>
                            <Button type='submit' style={{ marginTop: '1rem' }}>Chỉnh sửa</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default ItemModal
