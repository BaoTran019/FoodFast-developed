import { createContext, useState, useEffect } from 'react'
import {
    fetchMenu as fetchMenuFromFirestore,
    updateMenuItemAvailability,
    updateMenuItemInfo,
    createMenuItem
} from '../../js/get-menu'

export const MenuContext = createContext(null)

function MenuProvider({ children }) {

    const [menu, setMenu] = useState({}); // key = restaurantId, value = menu array

    const fetchMenu = async (restaurantId) => {
        if (menu[restaurantId]) {
            // đã có trong state → trả về luôn
            return menu[restaurantId];
        }
        // chưa có → fetch từ Firestore
        const data = await fetchMenuFromFirestore(restaurantId);
        setMenu(prev => ({ ...prev, [restaurantId]: data }));
        return data;
    };


    const setStatus = async (restaurantId, productId, status) => {
        try {
            await updateMenuItemAvailability(restaurantId, productId, status)
            setMenu(prev => ({
                ...prev,
                [restaurantId]: prev[restaurantId].map(item =>
                    item.id === productId
                        ? { ...item, available: status }
                        : item
                )
            }))
        } catch (err) {
            console.log('Cannot update product status', err)
            throw err
        }
    }

    const editInfo = async (restaurantId, productId, editted_info) => {
        try {
            await updateMenuItemInfo(restaurantId, productId, editted_info)
            setMenu(prev => ({
                ...prev,
                [restaurantId]: prev[restaurantId].map(item =>
                    item.id === productId
                        ? { ...item, ...editted_info } // merge info mới vào object item
                        : item
                )
            }));
        } catch (err) {
            console.log('Cannot update product status', err)
            throw err
        }
    }

    const addProduct = async (restaurantId, data) => {
        try {
        const newId = await createMenuItem(restaurantId, data);

        if (!newId) return false;

        const newItem = { id: newId, ...data };

        setMenu(prev => ({
            ...prev,
            [restaurantId]: prev[restaurantId]
                ? [...prev[restaurantId], newItem]
                : [newItem]
        }));
        } catch (err) {
            console.log('Cannot update product status', err)
            throw err
        }
    }

    return (
        <MenuContext.Provider value={{ menu, fetchMenu, setStatus, editInfo, addProduct }}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuProvider
