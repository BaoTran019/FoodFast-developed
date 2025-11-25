import CustomerCard from "./CustomerCard/CustomerCard"

function CustomerList({customers}) {
  return (
    <div>
      {customers.map(customer => (
                <CustomerCard customer={customer} />
            ))}
    </div>
  )
}

export default CustomerList
