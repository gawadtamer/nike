import { createContext, useState, useEffect } from "react";
import { useAuth } from "../Account/AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load user-specific cart on user change
  useEffect(() => {
    const storageKey = user ? `nike_cart_${user.email}` : "nike_cart_guest";
    const savedCart = localStorage.getItem(storageKey);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([]);
    }
  }, [user]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0 || (user && localStorage.getItem(`nike_cart_${user.email}`))) {
      const storageKey = user ? `nike_cart_${user.email}` : "nike_cart_guest";
      localStorage.setItem(storageKey, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, { ...product, cartId: Date.now() + Math.random() }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
