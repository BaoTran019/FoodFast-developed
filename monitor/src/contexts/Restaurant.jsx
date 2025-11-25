import { useState, useEffect, createContext } from 'react'
import { fetchRestaurant, createRestaurant, updateRestaurantActiveStatus, updateRestaurantInfo } from '../../js/get-restaurant'

export const RestaurantContext = createContext()

function RestaurantProvider({ children }) {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        const loadRest = async () => {
            try {
                const data = await fetchRestaurant()
                setRestaurants(data)
            } catch (err) {
                console.error(err)
            }
        }; loadRest() 
    }, [])

    const addRestaurant = async (new_restaurant) => {
        try {
            const created = await createRestaurant(new_restaurant)
            if (created) {
                setRestaurants(prev => [...prev, created])
            }
        } catch (err) {
            console.log('Lỗi thêm mới nhà hàng')
            throw err
        }
    }

    const updateActiveStatus = async (restaurantId, status) => {
        try {
            const success = await updateRestaurantActiveStatus(restaurantId, status)
            if (success) {
                setRestaurants(prev => prev.map(r => 
                    r.id === restaurantId ? { ...r, active: status } : r
                ))
            }
        } catch (err) {
            console.log('Lỗi cập nhật trạng thái nhà hàng')
            throw err
        }
    }

    const updateRestaurant = async (restaurantId, updatedData) => {
        try {
            const success = await updateRestaurantInfo(restaurantId, updatedData)
            if (success) {
                setRestaurants(prev => prev.map(r => 
                    r.id === restaurantId ? { ...r, ...updatedData } : r
                ))
            }
        } catch (err) {
            console.log('Lỗi cập nhật thông tin nhà hàng')
            throw err
        }
    }

    return (
        <RestaurantContext.Provider value={{restaurants, addRestaurant, updateActiveStatus, updateRestaurant}}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantProvider
