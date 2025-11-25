import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Spinner, Button } from 'react-bootstrap';
import { fetchRestaurantById } from '../../../js/get-restaurant';
import { fetchMenu } from '../../../js/get-menu';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import temp_img from '../../assets/footer/background.jfif'
import './Menu.css'

function Menu() {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const { addToCart } = useContext(CartContext)
    const [loading, setLoading] = useState(true); // state loading

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // bắt đầu load
                const data = await fetchRestaurantById(restaurantId)
                const menuData = await fetchMenu(restaurantId)
                setRestaurant(data)
                setMenu(menuData)
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); // kết thúc load
            }
        };
        fetchData();
    }, [restaurantId]);

    const HandleAddToCart = async (product) => {
        try {
            await addToCart(restaurant, product)
        } catch (err) {
            console.log('Lỗi thêm món ăn')
            throw err
        }
    }

    if (loading) return <div style={{ paddingBlock: '20vh', textAlign: 'center' }}><Spinner animation="border" variant="primary"/></div>;

    return (
        <Container style={{ paddingBlock: '20vh', textAlign: 'center' }}>
            <div className='content-container'>
                <div className="menu-banner">
                    <div className="banner-image">
                        <img src={temp_img} alt={restaurant.name} />
                    </div>
                    <div className="banner-info">
                        <h2>{restaurant.name}</h2>
                        <p>Địa chỉ: {restaurant.address}</p>
                        <p>Điện thoại: {restaurant.phone}</p>
                        <p>Rating: {restaurant.rating} ⭐</p>
                    </div>
                </div>
            </div>

            {/* Menu List Wrapper */}
            <div className="menu-section-wrapper">
                <h3>Menu</h3>
                <div className="menu-list">
                    {menu.map((item) => (
                        <div key={item.id} className="menu-item-card">
                            <div className="menu-item-info">
                                <h4>{item.name}</h4>
                                <p>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                </p>
                            </div>
                            <div className="menu-item-right">
                                <img className="menu-item-image" src={item.image} alt={item.name} />
                                <Button onClick={() => HandleAddToCart(item)} className="add-button">Thêm</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default Menu
