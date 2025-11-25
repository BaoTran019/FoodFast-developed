import { useContext, useState } from "react"
import { CustomersContext } from "../contexts/CustomersContext"
import { Container } from "react-bootstrap"
import CustomerList from "./CustomerList"

function Customers() {

  const { customers } = useContext(CustomersContext)

  return (
    <div>
      <Container>
        <CustomerList customers={customers} />
      </Container>
    </div>
  )
}

export default Customers
