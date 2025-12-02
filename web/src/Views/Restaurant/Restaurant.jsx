import React, { useContext, useState } from 'react'
import { RestaurantContext } from '../../context/Restaurant'
import RestaurantCard from './RestaurantCard'
import { Container, Form, InputGroup } from 'react-bootstrap'

function Restaurant() {
    const { restaurants } = useContext(RestaurantContext)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredRestaurants = restaurants.filter((res) =>
        res.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <Container style={{ paddingBlock: '20vh' }}>
            {/* Search bar */}
            <InputGroup
                className="mb-4"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                <Form.Control
                    type="text"
                    placeholder="🔍 Tìm kiếm nhà hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="shadow-sm"
                    style={{
                        borderRadius: '50px',
                        padding: '1rem 2rem',
                        fontSize: '1.1rem',
                    }}
                />
            </InputGroup>

            {/* Restaurant list */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                justifyItems: 'center'
            }}>
                {filteredRestaurants.map((res) => (
                    <RestaurantCard key={res.id} restaurant={res} />
                ))}
            </div>
        </Container>
    )
}

export default Restaurant
