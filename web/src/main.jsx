import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import RestaurantProvider from './context/Restaurant.jsx'
import AuthenProvider from './context/AuthContext.jsx'

import CartProvider from './context/CartContext.jsx'
import AuthProvider from './context/AuthenticationContext.jsx'
import UserProvider from './context/UserContext.jsx'
import OrderProvider from './context/OrderContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <AuthenProvider>
        <AuthProvider>
          <UserProvider>
            <RestaurantProvider>
                <CartProvider>
                  <OrderProvider>
                    <App />
                  </OrderProvider>
                </CartProvider>
            </RestaurantProvider>
          </UserProvider>
        </AuthProvider>
      </AuthenProvider>
    </BrowserRouter>
  </StrictMode>,
)
