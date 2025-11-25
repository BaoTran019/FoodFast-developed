import { useContext } from "react"
import { useParams, NavLink } from 'react-router-dom'
import { OrdersContext } from "../contexts/OrdersContext"
import { Button } from "react-bootstrap"
import OrderCard from "./OrderCard/OrderCard"

function Orders_By_Customers() {

    const { uid } = useParams()
    console.log(uid)
    const {filterOrdersByCustomer} = useContext(OrdersContext)
    const orders = filterOrdersByCustomer(uid) 
    console.log(orders)



  return (
    <div>
      {orders.map(order => (
        <OrderCard order={order}></OrderCard>
      ))}

      <Button as={NavLink} to ='/Customers'>Quay lại</Button>
    </div>
  )
}

export default Orders_By_Customers
