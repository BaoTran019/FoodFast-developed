import { createContext, useEffect, useState } from 'react'
import { food_list } from '../assets/assets'
import { fetchMenu } from '../api/productAPI'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [menu, setMenu] = useState([])

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const data = await fetchMenu()
                const mappedMenu = data.map((item) => ({
                    id: item.productId,
                    name: item.productName,
                    description: item.description,
                    price: item.price,
                    image: item.imageUrl,
                    category: item.category?.categoryName || "Khác",
                    status: item.available ? "on-sale" : "off-sale",
                }));

                setMenu(mappedMenu);
            }
            catch (err) {
                console.log('Cannot get Menu')
            }
        }

        loadMenu();
    }, []);


    const onSaleProduct = () => {
        return menu.filter(item => item.status === "on-sale")
    }


    return (
        <StoreContext.Provider value={{ menu, onSaleProduct }}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider