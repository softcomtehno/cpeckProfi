import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  // Функция форматирования цены
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сом";
  };

  // Обработчик увеличения количества товара
  const handleIncreaseQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.product.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  // Обработчик уменьшения количества товара
  const handleDecreaseQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Корзина</h1>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Список товаров */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="border-b border-neutral-200 p-4 last:border-0 animate-fade-in"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Изображение товара */}
                      <div className="w-full sm:w-24 h-24">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      {/* Информация о товаре */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-bold text-lg mb-1 hover:text-primary-600 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="text-sm text-neutral-600 mb-2">
                              {item.size && (
                                <span>Размер: {item.size} &bull; </span>
                              )}
                              {item.color && <span>Цвет: {item.color}</span>}
                            </div>
                          </div>
                          <div className="text-lg font-bold mt-2 sm:mt-0">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>

                        {/* Управление количеством и удаление */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-neutral-300 rounded-md">
                            <button
                              onClick={() =>
                                handleDecreaseQuantity(item.product.id)
                              }
                              className="px-2 py-1 text-neutral-600 hover:bg-neutral-100 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2 py-1 w-10 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncreaseQuantity(item.product.id)
                              }
                              className="px-2 py-1 text-neutral-600 hover:bg-neutral-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-neutral-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Кнопки управления корзиной */}
              <div className="mt-4 flex flex-wrap gap-4">
                <Link
                  to="/catalog"
                  className="btn-outline flex items-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Продолжить покупки
                </Link>

                <button
                  onClick={clearCart}
                  className="btn-outline text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Очистить корзину
                </button>
              </div>
            </div>

            {/* Сводка заказа */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Сводка заказа</h2>

                <div className="border-t border-b border-neutral-200 py-4 my-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">Товаров в корзине:</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Общее количество:</span>
                    <span>
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold">Итого:</span>
                  <span className="text-2xl font-bold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  Оформить заказ
                  <ArrowRight size={18} />
                </Link>

                <p className="text-sm text-neutral-500 mt-4 text-center">
                  Доставка и способ оплаты будут рассчитаны на следующем шаге
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <ShoppingBag size={64} className="text-neutral-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ваша корзина пуста</h2>
            <p className="text-neutral-600 mb-6">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Link to="/catalog" className="btn-primary inline-block">
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
