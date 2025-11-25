import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import OrdersProvider from './contexts/OrdersContext.jsx';
import MenuProvider from './contexts/MenuContext.jsx';
import CustomerProvider from './contexts/CustomersContext.jsx';
import AuthProvider from './contexts/AuthenticationContext.jsx';
import RestaurantProvider from './contexts/Restaurant.jsx';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RestaurantProvider>
          <MenuProvider>
            <CustomerProvider>
              <OrdersProvider>
                <App />
              </OrdersProvider>
            </CustomerProvider>
          </MenuProvider>
        </RestaurantProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
