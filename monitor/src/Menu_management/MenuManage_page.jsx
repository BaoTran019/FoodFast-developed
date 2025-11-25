import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { MenuContext } from "../contexts/MenuContext"
import { RestaurantContext } from "../contexts/Restaurant"
import { Button } from "react-bootstrap"
import ItemCard from "./ItemCard/ItemCard"
import AddItemModal from "./ItemModal/AddItemModal"
import './MenuManage.css'

function MenuManage_page() {

  const { restaurantId } = useParams();
  const { menu, fetchMenu } = useContext(MenuContext)
  const { restaurants } = useContext(RestaurantContext)
  const [show, setShow] = useState(false)
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(false)
  const restaurantMenu = menu[restaurantId] || []

  // Load menu
  useEffect(() => {
    fetchMenu(restaurantId)
  }, [restaurantId])

  // Load restaurant info
  useEffect(() => {
    const rest = restaurants.find(r => r.id === restaurantId)
    if (rest) setRestaurant(rest)
  }, [restaurants, restaurantId])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

      {restaurant && (
        <div className="restaurant-info" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '10px' }}>
          <h2>{restaurant.name}</h2>
          <p>Address: {restaurant.address}</p>
          <p>Phone: {restaurant.phone}</p>
          <p>Status: {restaurant.active ? 'Đang hoạt động' : 'Ngừng hoạt động'}</p>
        </div>
      )}

      <Button className="floating-add-btn" onClick={() => setShow(true)}>
        Thêm món vào menu
      </Button>

      <div className="menu-items" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {loading ? 'Loading' :
          restaurantMenu.map((item) => (
            <ItemCard key={item.productId} item={item} restaurantId={restaurantId} />
          ))
        }
      </div>

      <AddItemModal show={show} handleCloseModal={setShow} />
    </div>
  )
}

export default MenuManage_page
