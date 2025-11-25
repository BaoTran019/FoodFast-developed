import React, { useState, useContext } from 'react'
import FoodSwiper from './components/Swiper/FoodSwiper'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Menu.css'
import spaghettiIcon from '../assets/icons/spaghetti.png'
import fastFoodIcon from '../assets/icons/fast-food.png'
import friedChicken from '../assets/icons/fried-chicken.png'
import sodaIcon from '../assets/icons/soda.png'
import { Button } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext';
import My_Product_Card from './components/Product_Card/My_Product_Card';
import { motion, AnimatePresence } from "framer-motion";

function Menu() {

    const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };
    const fadeInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    };

    const [category, setCategory] = useState('')

    const { onSaleProduct } = useContext(StoreContext)
    const food_list = onSaleProduct()

    const filters = [
        { icon: fastFoodIcon, category: "", label: "Tất cả món ăn", title: 'https://www.flaticon.com/free-icons/fast-food' },
        { icon: friedChicken, category: "Fried_Chicken", label: "Gà Giòn", title: 'https://www.flaticon.com/free-icons/fried-chicken' },
        { icon: spaghettiIcon, category: "Spaghetti", label: "Mì Ý", title: 'https://www.flaticon.com/free-icons/pasta' },
        { icon: sodaIcon, category: "Drink", label: "Nước / tráng miệng", title: 'https://www.flaticon.com/free-icons/soda' },
    ]
    const [filterLabel, setFilterLabel] = useState('Tất cả')

    return (
        <div className='menu container' style={{ paddingBlock: '20vh', textAlign: 'center' }}>
            <div className='menu-filter'>
                {filters.map((filter, index) => (
                    <motion.div className='filter-button'
                        variants={fadeInLeft}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: index * 0.2 }}>
                        <img className='filter-icon' src={filter.icon}
                            onClick={() => { setCategory(filter.category), setFilterLabel(filter.label) }}
                            title={filter.title}></img>
                        <h4>{filter.label}</h4>
                    </motion.div>
                ))}
            </div>

            <h2 style={{ marginTop: '2vh', fontSize: '70px', color: '#b42100' }}>{filterLabel}</h2>

            <AnimatePresence mode="wait">
                <motion.div className='menu-wrapper'
                    key={category}
                    variants={fadeInRight}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}>
                    {food_list.filter(food => !category || food.category === category).map((food) => (
                        <My_Product_Card food={food} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default Menu
