import React, { useContext, useState } from 'react'
import { RestaurantContext } from '../contexts/Restaurant'
import RestaurantCard from './RestaurantCard'
import { Container } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import AddRestModal from './Modal/AddRestModal'
import './Restaurant.css'

function Restaurant() {

    const { restaurants } = useContext(RestaurantContext)
    const [show, setShow] = useState(false)

    return (
        <>
            <Container style={{
                paddingBottom: '3vh',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5vw'
            }}>
                {restaurants.map((res) => (
                    <RestaurantCard restaurant={res} />
                ))}
            </Container>

            <Button className="floating-add-restaurant-btn"
                onClick={() => setShow(true)}
            >
                Thêm nhà hàng
            </Button>

            <AddRestModal show={show} handleCloseModal={setShow} ></AddRestModal>
        </>
    )
}

export default Restaurant
