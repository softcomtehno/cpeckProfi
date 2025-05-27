import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../data/products";

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    size?: string,
    color?: string
  ) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Загрузка данных корзины из localStorage при инициализации
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Сохранение корзины в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    setCartItems((prevItems) => {
      // Проверка, есть ли уже такой товар в корзине с такими же параметрами
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingItemIndex >= 0) {
        // Если товар уже есть в корзине, обновляем количество
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Если товара нет, добавляем новый
        return [...prevItems, { product, quantity, size, color }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Подсчет общего количества товаров
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Подсчет общей стоимости
  const totalPrice = cartItems.reduce(
    (total, item) => total + item?.product?.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
