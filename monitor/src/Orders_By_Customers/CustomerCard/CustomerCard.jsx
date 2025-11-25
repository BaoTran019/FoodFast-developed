import { useState } from "react"
import { Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import CustomerModal from "../CustomerModal/CustomerModal"
import './CustomerCard.css'

function CustomerCard({ customer }) {

    const [show, setShow] = useState(false)

    return (
        <div className="customer-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h4>#{customer.uid}</h4>
                <div>
                    <span>{customer.name}</span>
                    <span className="mx-2">•</span>
                    <span>{customer.phone}</span>
                    <span className="mx-2">•</span>
                    <span>{customer.address}</span>
                    <span className="mx-2">•</span>
                    <span>{customer.email}</span>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button className='show-detail-btn'
                    as={NavLink}
                    to={`/orders_by_customers/${customer.uid}`}>
                    Các đơn hàng
                </Button>

                <Button className="customer-info-btn" onClick={() => setShow(true)}>Thông tin</Button>
            </div>

            <CustomerModal show={show} handleCloseModal={setShow} customer={customer}></CustomerModal>
        </div>
    )
}

export default CustomerCard
