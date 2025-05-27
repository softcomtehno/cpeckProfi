import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories, Product } from '../data/products';
import { Filter, ChevronDown, ChevronUp, Search } from 'lucide-react';

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search');

  // Состояние для хранения отфильтрованных продуктов
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Состояние для фильтров
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(category ? [category] : []);
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  // Получить минимальную и максимальную цены из данных
  const minPrice = Math.min(...products.map((product) => product.price));
  const maxPrice = Math.max(...products.map((product) => product.price));

  // Инициализация диапазона цен при первой загрузке
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Обновляем фильтрацию при изменении параметров
  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    }
    
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [category, searchQuery]);

  // Применение фильтров и сортировки
  useEffect(() => {
    let result = [...products];

    // Фильтр по категориям
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Фильтр по цене
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Фильтр по поисковому запросу
    if (searchTerm) {
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Сортировка
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // По умолчанию сортировка не применяется
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategories, priceRange, searchTerm, sortOption, category, searchQuery]);

  // Обработчик изменения категорий
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(cat => cat !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Обработчик изменения сортировки
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Обработчик изменения поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Обработчик изменения нижней границы цены
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    setPriceRange([newMin, priceRange[1]]);
  };

  // Обработчик изменения верхней границы цены
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    setPriceRange([priceRange[0], newMax]);
  };

  // Получаем название текущей категории для заголовка
  const getCategoryName = () => {
    if (category) {
      const currentCategory = categories.find(cat => cat.id === category);
      return currentCategory ? currentCategory.name : 'Все товары';
    }
    if (searchTerm) {
      return `Результаты поиска: "${searchTerm}"`;
    }
    return 'Все товары';
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-12">
      <div className="bg-primary-900 py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">{getCategoryName()}</h1>
          <p className="text-primary-200 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 
              filteredProducts.length >= 2 && filteredProducts.length <= 4 ? 'товара' : 'товаров'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Поиск */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="py-2 px-4 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 w-full"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
          </div>

          {/* Сортировка и переключатель фильтра */}
          <div className="flex justify-between md:justify-end w-full md:w-auto gap-4">
            <div className="relative">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="border border-neutral-300 rounded-lg py-2 pl-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешевые</option>
                <option value="price-desc">Сначала дорогие</option>
                <option value="name-asc">По названию (А-Я)</option>
                <option value="name-desc">По названию (Я-А)</option>
                <option value="rating">По рейтингу</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={() => setFilterIsOpen(!filterIsOpen)}
              className="md:hidden bg-primary-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <Filter size={18} />
              Фильтры
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Фильтры - боковая панель */}
          <aside className={`w-full md:w-64 bg-white p-6 rounded-lg shadow-md ${filterIsOpen ? 'block' : 'hidden'} md:block`}>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Фильтры</h3>
                <button
                  onClick={() => setFilterIsOpen(false)}
                  className="md:hidden text-neutral-500"
                >
                  <ChevronUp size={20} />
                </button>
              </div>

              {/* Фильтр по категориям */}
              <div className="mb-6">
                <h4 className="font-bold mb-2">Категории</h4>
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`category-${cat.id}`}
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                    <label
                      htmlFor={`category-${cat.id}`}
                      className="ml-2 text-sm text-neutral-800"
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* Фильтр по цене */}
              <div>
                <h4 className="font-bold mb-2">Цена</h4>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label htmlFor="min-price" className="text-xs text-neutral-500">
                      От
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      min={minPrice}
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={handleMinPriceChange}
                      className="border border-neutral-300 rounded px-2 py-1 w-full text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="text-xs text-neutral-500">
                      До
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      min={priceRange[0]}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={handleMaxPriceChange}
                      className="border border-neutral-300 rounded px-2 py-1 w-full text-sm"
                    />
                  </div>
                </div>
                <div className="relative pt-5">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    className="absolute w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    className="absolute w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Список товаров */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Товары не найдены</h3>
                <p className="text-neutral-600 mb-4">
                  К сожалению, товары по заданным параметрам не найдены. Попробуйте изменить критерии поиска.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([minPrice, maxPrice]);
                    setSearchTerm('');
                  }}
                  className="btn-primary"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;