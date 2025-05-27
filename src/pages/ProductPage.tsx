import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Star,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { products, Product } from "../data/products";
import toast from "react-hot-toast";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  // Находим товар по id
  const product = products.find((p) => p.id === Number(id));

  // Состояние для выбранных опций
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  // Устанавливаем начальные значения
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  // Если товар не найден
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <p className="mb-6 text-neutral-600">
            Запрашиваемый товар не существует или был удален.
          </p>
          <Link to="/catalog" className="btn-primary">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  // Обработчик добавления товара в корзину
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} добавлен в корзину`);
  };

  // Обработчики изменения количества
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Функция форматирования цены
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сом";
  };

  return (
    <div className="bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Хлебные крошки */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="text-neutral-500 hover:text-primary-600">
            Главная
          </Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <Link
            to="/catalog"
            className="text-neutral-500 hover:text-primary-600"
          >
            Каталог
          </Link>
          <ChevronRight size={16} className="mx-2 text-neutral-400" />
          <span className="text-neutral-800 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Галерея изображений */}
            <div>
              <div className="mb-4 relative h-80 md:h-96 overflow-hidden rounded-lg">
                <img
                  src={product.images[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Бейджи */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-primary-600 text-white text-xs font-medium py-1 px-2 rounded">
                      Новинка
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="bg-secondary-500 text-white text-xs font-medium py-1 px-2 rounded">
                      Скидка{" "}
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      )}
                      %
                    </span>
                  )}
                </div>
              </div>

              {/* Миниатюры */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-20 h-20 overflow-hidden rounded border-2 ${
                        currentImage === index
                          ? "border-primary-600"
                          : "border-neutral-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - изображение ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Информация о товаре */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {product.name}
              </h1>

              {/* Рейтинг */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-neutral-600">
                    {product.rating} ({product.reviews} отзывов)
                  </span>
                </div>
              </div>

              {/* Цена */}
              <div className="mb-4">
                {product.oldPrice && (
                  <span className="text-neutral-500 line-through text-lg block">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-2xl font-bold">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-neutral-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Наличие */}
              <div className="mb-4 flex items-center">
                {product.inStock ? (
                  <>
                    <Check size={18} className="text-green-600 mr-2" />
                    <span className="text-green-600">В наличии</span>
                  </>
                ) : (
                  <span className="text-red-500">Нет в наличии</span>
                )}
              </div>

              {/* Размеры */}
              {product.sizes.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Размер:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md ${
                          selectedSize === size
                            ? "border-primary-600 bg-primary-50 text-primary-600"
                            : "border-neutral-300 hover:border-neutral-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Цвета */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Цвет:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-md ${
                          selectedColor === color
                            ? "border-primary-600 bg-primary-50 text-primary-600"
                            : "border-neutral-300 hover:border-neutral-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Количество и добавление в корзину */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center border border-neutral-300 rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-2 text-neutral-600 hover:bg-neutral-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-center w-12">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-2 text-neutral-600 hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`btn-primary flex items-center gap-2 flex-grow ${
                    !product.inStock ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <ShoppingCart size={18} />В корзину
                </button>
              </div>

              {/* Особенности товара */}
              <div className="mt-8">
                <h3 className="font-bold mb-2">Особенности:</h3>
                <ul className="list-disc pl-5 text-neutral-700">
                  {product.features.map((feature, index) => (
                    <li key={index} className="mb-1">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка назад в каталог */}
        <div className="mt-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft size={18} />
            Вернуться в каталог
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
