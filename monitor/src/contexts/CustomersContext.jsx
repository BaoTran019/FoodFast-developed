import { createContext, useEffect, useState } from 'react'
import { fetchAllUsers, changeInfo as changeInfoFirestore } from '../../js/user'

export const CustomersContext = createContext(null)

function CustomerProvider({ children }) {

    const [customers, setCustomers] = useState([])

    const getUsers = async () => {
        try {
            const newCustomers = await fetchAllUsers()
            setCustomers(newCustomers)
        } catch (err) {
            console.error('Cannot get users:', err)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const changeInfo = async (uid, info) => {
        try {
            await changeInfoFirestore(uid, info)
            setCustomers(prev => prev.map(c =>
                c.uid === uid ? { ...c, ...info } : c
            ));
        }
        catch (err) {
            console.log('Cannot update info')
        }
    }

    return (
        <CustomersContext.Provider value={{ customers, changeInfo }}>
            {children}
        </CustomersContext.Provider>
    )
}

export default CustomerProvider
