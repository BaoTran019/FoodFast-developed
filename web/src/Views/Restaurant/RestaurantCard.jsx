import { useState } from 'react'
import './RestaurantCard.css'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function RestaurantCard({ restaurant }) {

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/menu/${restaurant.id}`)
    }

    return (
        <>
            <Card className='customed-card' style={{ width: "30rem", height: "23rem" }}
            onClick={handleNavigate}>
                <div className='image-wrapper'>
                    <Card.Img variant='top' src={restaurant.image} alt={restaurant.name} />
                </div>
                <div className='body-wrapper'>
                    <Card.Body>
                        <Card.Title className='card-title'>{restaurant.name}</Card.Title>
                        <Card.Text className='card-text'>
                            address: {restaurant.address}
                        </Card.Text>
                        <Card.Text className='card-text'>
                            phone: {restaurant.phone}
                        </Card.Text>
                        <Card.Text className='card-text'>
                            rating: {restaurant.rating}
                        </Card.Text>
                    </Card.Body>
                </div>
            </Card>
        </>
    )
}

export default RestaurantCard
