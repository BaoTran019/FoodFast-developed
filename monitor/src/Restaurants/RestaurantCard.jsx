import { useState, useContext } from 'react'
import './RestaurantCard.css'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { RestaurantContext } from '../contexts/Restaurant'

function RestaurantCard({ restaurant }) {

    const { updateActiveStatus } = useContext(RestaurantContext)

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/menu/${restaurant.id}`)
    }

    const handleSetStatus = async (status, e) => {
        e.stopPropagation();
        try {
            await updateActiveStatus(restaurant.id, status)
        } catch (err) {
            throw err
        }
    }

    const renderButton = () => {
        if (restaurant.active === true)
            return <Button className='item-card-btn stop-selling-btn' onClick={(e) => handleSetStatus(false,e)}>Ngừng hoạt động</Button>
        else return <Button className='item-card-btn sale-btn' onClick={(e) => handleSetStatus(true,e)}>Đưa vào hoạt động</Button>
    }

    return (
        <>
            <Card className={`customed-card ${restaurant.active === true ? "on-sale" : "off-sale"}`} style={{ width: "30rem", height: "23rem" }}
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
                        <Card.Text className='card-text' style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            {restaurant.active ? 'Đang hoạt động' : 'Ngừng hỗ trợ'} {renderButton()}
                        </Card.Text>
                    </Card.Body>
                </div>
            </Card>
        </>
    )
}

export default RestaurantCard
