import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, Phone } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { categories } from "../data/products";

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Обработчик прокрутки страницы для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Обработчик поиска
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  // Переключение мобильного меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Верхняя полоса с контактами */}
      <div className="bg-neutral-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span className="text-sm">+996 500 90-90-90</span>
            </div>
            <p className="text-sm hidden sm:block">Доставка по всей Бишкеку</p>
          </div>
          <div>
            <Link
              to="/account"
              className="text-sm hover:text-secondary-400 transition"
            >
              Личный кабинет
            </Link>
          </div>
        </div>
      </div>

      {/* Основная часть хедера */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link
            to="/"
            className="text-2xl font-bold text-neutral-900 flex items-center"
          >
            <span className="text-secondary-500">Спец</span>Профи
          </Link>

          {/* Навигация для десктопов */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="font-medium hover:text-primary-600 transition"
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              className="font-medium hover:text-primary-600 transition"
            >
              Каталог
            </Link>
            <Link
              to="/about"
              className="font-medium hover:text-primary-600 transition"
            >
              О компании
            </Link>
            <Link
              to="/delivery"
              className="font-medium hover:text-primary-600 transition"
            >
              Доставка
            </Link>
            <Link
              to="/contacts"
              className="font-medium hover:text-primary-600 transition"
            >
              Контакты
            </Link>
          </nav>

          {/* Поиск и корзина */}
          <div className="flex items-center space-x-4">
            {/* Форма поиска для десктопов */}
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 px-3 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 w-60"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary-600"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Корзина */}
            <Link to="/cart" className="relative">
              <ShoppingCart
                size={24}
                className="text-neutral-900 hover:text-primary-600 transition"
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Кнопка мобильного меню */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-neutral-900 hover:text-primary-600 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Категории для десктопов */}
      <div className="hidden md:block border-t border-neutral-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between py-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog/${category.id}`}
                className="flex items-center gap-1 px-2 py-1 text-sm font-medium hover:text-primary-600 transition"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-neutral-200 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            {/* Форма поиска для мобильных */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-2 px-3 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 w-full"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary-600"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Навигация */}
            <nav className="flex flex-col space-y-3 mb-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-medium py-2 hover:text-primary-600 transition"
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMenuOpen(false)}
                className="font-medium py-2 hover:text-primary-600 transition"
              >
                Каталог
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="font-medium py-2 hover:text-primary-600 transition"
              >
                О компании
              </Link>
              <Link
                to="/delivery"
                onClick={() => setIsMenuOpen(false)}
                className="font-medium py-2 hover:text-primary-600 transition"
              >
                Доставка
              </Link>
              <Link
                to="/contacts"
                onClick={() => setIsMenuOpen(false)}
                className="font-medium py-2 hover:text-primary-600 transition"
              >
                Контакты
              </Link>
            </nav>

            {/* Категории */}
            <div className="border-t border-neutral-200 pt-4">
              <h3 className="font-bold mb-2">Категории</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/catalog/${category.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-1 px-2 py-2 text-sm hover:bg-neutral-100 rounded-md"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
