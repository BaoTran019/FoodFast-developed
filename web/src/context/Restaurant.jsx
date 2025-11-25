import { useState, useEffect, createContext } from 'react'
import { fetchRestaurant } from '../../js/get-restaurant'

export const RestaurantContext = createContext()

function RestaurantProvider({ children }) {

    const [restaurants, setRestaurant] = useState([])

    useEffect(() => {
        const loadRest = async () => {
            try {
                const data = await fetchRestaurant()
                setRestaurant(data)
            } catch (err) {
                console.error(err)
            }
        }; loadRest() 
    }, [])

    return (
        <RestaurantContext.Provider value={{restaurants}}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantProvider
