import React, { useContext } from 'react'
import { RestaurantContext } from '../../context/Restaurant'
import RestaurantCard from './RestaurantCard'
import { Container } from 'react-bootstrap'

function Restaurant() {

    const { restaurants } = useContext(RestaurantContext)


    return (
        <Container style={{
            paddingBlock: '20vh',
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
    )
}

export default Restaurant
