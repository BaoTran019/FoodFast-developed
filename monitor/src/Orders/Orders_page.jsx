import { Button, Container } from 'react-bootstrap'
import './Orders_page.css'
import { useState } from 'react'
import OrderList from '../components/OrderList/OrderList'

function Orders_page() {

  const [filter, setFilter] = useState('pending')

  const buttons = [
    {id: 'pending', label:'New Orders'},
    {id: 'processing', label:'In Progress'},
    {id: 'delivering', label:'Ready for Delivery'},
    {id: 'completed', label:'Completed'},
  ]

  return (
    <div>
      {/* ORDERS FILTER */}
      <Container className='orders-filter'>
        {buttons.map((btn)=>(
          <Button
          key={btn.id}
          id={btn.id}
          className={filter === btn.id ? "active" : ""}
          onClick={() => setFilter(btn.id)}
          >
            {btn.label}
          </Button>
        ))}
      </Container>

      {/* LIST OF ORDERS */}
      <Container>
        <OrderList status={filter}/>
      </Container>
    </div>
  )
}

export default Orders_page
