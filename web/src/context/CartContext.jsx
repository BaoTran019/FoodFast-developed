import { createContext, useContext, useState, useEffect } from "react";
import { AuthenContext } from "./AuthContext";
import {
  fetchCartItems,
  addToCart as addToCartFirestore,
  updateCartItemQty as updateCartItemQtyFirestore,
  removeCartItem as removeCartItemFirestore,
  clearCart as clearCartFirestore
} from "../../js/get-cart";
import { toast } from "react-toastify";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState({ cartItems: [], totalPrice: 0, restaurantName: ''  });
  const { currentUser } = useContext(AuthenContext);
  const userId = currentUser?.uid;

  useEffect(() => {
    const fetchCartData = async () => {
      console.log(userId)
      try {
        const data = await fetchCartItems(userId);
        const restaurantName = data[0]?.restaurantName || '';
        setCart({
          cartItems: data || [],
          totalPrice: data?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0,
          restaurantName
        });
        console.log(cart)
      } catch (err) {
        console.error("Lỗi load cart:", err);
      }
    };
    fetchCartData();
  }, [userId]);

  const addToCart = async (restaurant, product) => {
    if (!currentUser) return;
    const uid = currentUser.uid;

    // Check restaurantId
    if (cart.cartItems.length > 0) {
      const existingRestaurantId = cart.cartItems[0].restaurantId;
      if (existingRestaurantId !== restaurant.id) {
        toast.error("Giỏ hàng chỉ có thể chứa món từ 1 nhà hàng. Vui lòng thanh toán hoặc xóa giỏ trước khi thêm món mới.");
        return;
      }
    }

    // Gọi Firestore (đã có trong get-cart.js)
    await addToCartFirestore(uid, product, restaurant.id, restaurant.name);

    // Update state local
    setCart(prev => {
      const exist = prev.cartItems.find(i => i.id === product.id);
      let newCartItems;
      if (exist) {
        newCartItems = prev.cartItems.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newCartItems = [...prev.cartItems, { ...product, quantity: 1 }];
      }
      const newTotal = newCartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { cartItems: newCartItems, totalPrice: newTotal, restaurantName: restaurant.name };
    });

    toast.success(`Đã thêm món ${product.name} vào giỏ`)
  };

  const updateQty = async (productId, delta) => {
    if (!currentUser) return;

    // 1. Update Firestore
    await updateCartItemQtyFirestore(currentUser.uid, productId, delta);

    // 2. Update state local
    setCart(prevCart => {
      const newCartItems = prevCart.cartItems.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);

      const newTotal = newCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        cartItems: newCartItems,
        totalPrice: newTotal
      };
    });
  };

  const removeItem = async (productId) => {
    if (!currentUser) return;

    await removeCartItemFirestore(currentUser.uid, productId);

    setCart(prevCart => {
      const newCartItems = prevCart.cartItems.filter(item => item.id !== productId);
      const newTotal = newCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        cartItems: newCartItems,
        totalPrice: newTotal
      };
    });
  };

  const clearCart = async () => {
    if (!currentUser) return;

    await clearCartFirestore(currentUser.uid);

    setCart({
      cartItems: [],
      totalPrice: 0
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
