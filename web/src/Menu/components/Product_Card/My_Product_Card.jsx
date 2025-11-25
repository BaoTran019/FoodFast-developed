import { useState } from 'react'
import './Product_Card.css'
import { Card } from 'react-bootstrap'
import './My_Product_Card.css'
import ProductModal from '../ProductModal/ProductModal'

function My_Product_Card({ food }) {

    const [open, setOpen] = useState(false)

    return (
        <>
            <Card className='customed-card' style={{ width: "18rem", height: "23rem" }}
                onClick={() => setOpen(true)}>
                <div className='image-wrapper'>
                    <Card.Img variant='top' src={food.image} alt={food.name} />
                </div>
                <div className='body-wrapper'>
                    <Card.Body>
                        <Card.Title className='card-title'>{food.name}</Card.Title>
                        <Card.Text className='card-text'>
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(food.price)}
                        </Card.Text>
                    </Card.Body>
                </div>
            </Card>
            <ProductModal
                show={open}
                handleCloseModal={setOpen}
                food={food}></ProductModal>
        </>
    )
}

export default My_Product_Card
