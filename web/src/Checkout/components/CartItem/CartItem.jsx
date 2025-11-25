import React from 'react'
import './CartItem.css'

function CartItem({ item }) {
    return (
        <div className='checkout-cart-item' >
            <div>
                <img src={item.image} style={{ height: '100px' }}></img>
            </div>
            <div style={{ marginLeft: '0.8em' }}>
                <h4 style={{ color: '#ff8c09'}}>{item.name}</h4>
                <p style={{marginBottom:'0'}}>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}</p>
                <p>x {item.quantity}</p>
            </div>
        </div>
    )
}

export default CartItem
