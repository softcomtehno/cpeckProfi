import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "../data/products";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  // Обработчик добавления товара в корзину
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} добавлен в корзину`);
  };

  // Функция для форматирования цены
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сом";
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="card card-hover group bg-white rounded-lg overflow-hidden relative transition-all duration-300 flex flex-col h-full"
    >
      {/* Бейджи на карточке товара */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-primary-600 text-white text-xs font-medium py-1 px-2 rounded">
            Новинка
          </span>
        )}
        {product.oldPrice && (
          <span className="bg-secondary-500 text-white text-xs font-medium py-1 px-2 rounded">
            Скидка{" "}
            {Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )}
            %
          </span>
        )}
      </div>

      {/* Изображение товара */}
      <div className="overflow-hidden relative h-56">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Информация о товаре */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <span className="text-sm text-neutral-500 mb-1 block">
            {product.category === "workwear" && "Рабочая одежда"}
            {product.category === "footwear" && "Защитная обувь"}
            {product.category === "ppe" && "Средства защиты"}
            {product.category === "accessories" && "Аксессуары"}
            {product.category === "winter" && "Зимняя одежда"}
          </span>
          <h3 className="font-medium text-lg leading-tight">{product.name}</h3>
        </div>

        {/* Рейтинг */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-neutral-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-neutral-500 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Цена и наличие */}
        <div className="mt-auto">
          <div className="flex items-center mb-2">
            {product.inStock ? (
              <span className="text-green-600 text-sm">В наличии</span>
            ) : (
              <span className="text-red-500 text-sm">Нет в наличии</span>
            )}
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col">
              {product.oldPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-lg font-bold text-neutral-900">
                {formatPrice(product.price)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`p-2 rounded-full ${
                product.inStock
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
              } transition-colors duration-200`}
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
