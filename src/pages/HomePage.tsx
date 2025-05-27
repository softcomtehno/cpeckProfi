import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Clock,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import {
  categories,
  getPopularProducts,
  getNewProducts,
} from "../data/products";

const HomePage: React.FC = () => {
  const popularProducts = getPopularProducts();
  const newProducts = getNewProducts();

  return (
    <div>
      {/* Главный баннер */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Профессиональная спецодежда для любых условий работы
              </h1>
              <p className="text-lg mb-8 max-w-xl">
                Качественная рабочая экипировка от ведущих производителей.
                Защита, комфорт и безопасность для каждого специалиста.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/catalog"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  Перейти в каталог
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/catalog/workwear"
                  className="btn-outline bg-transparent border-white text-white hover:bg-white/10 flex items-center justify-center"
                >
                  Специальные предложения
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/8961253/pexels-photo-8961253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Рабочий в защитной одежде"
                className="rounded-lg shadow-xl object-cover h-96 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary-600" size={24} />
              </div>
              <h3 className="font-bold mb-2">Гарантия качества</h3>
              <p className="text-neutral-600 text-sm">
                Соответствие всем стандартам ГОСТ
              </p>
            </div>
            <div className="p-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Truck className="text-primary-600" size={24} />
              </div>
              <h3 className="font-bold mb-2">Быстрая доставка</h3>
              <p className="text-neutral-600 text-sm">
                Доставка по всей Бишкеку
              </p>
            </div>
            <div className="p-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <CreditCard className="text-primary-600" size={24} />
              </div>
              <h3 className="font-bold mb-2">Удобная оплата</h3>
              <p className="text-neutral-600 text-sm">Наличными или картой</p>
            </div>
            <div className="p-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Clock className="text-primary-600" size={24} />
              </div>
              <h3 className="font-bold mb-2">Оперативность</h3>
              <p className="text-neutral-600 text-sm">
                Быстрая обработка заказов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Категории товаров
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Широкий выбор спецодежды и средств защиты для различных сфер
              деятельности
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog/${category.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {category.description}
                    </p>
                  </div>
                  <div className="bg-primary-100 rounded-full p-3 group-hover:bg-primary-200 transition-colors">
                    <ArrowRight className="text-primary-600" size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Популярные товары
            </h2>
            <Link
              to="/catalog"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Все товары
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Специальное предложение */}
      <section className="py-12 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Специальное предложение
              </h2>
              <p className="mb-6 text-neutral-300">
                Комплект рабочей одежды "Мастер" по специальной цене при заказе
                от 5 комплектов. Скидка 15% на каждый комплект!
              </p>
              <Link
                to="/catalog/workwear"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Подробнее
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/8962202/pexels-photo-8962202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Комплект рабочей одежды"
                className="rounded-lg object-cover w-full h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Новинки */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Новинки</h2>
            <Link
              to="/catalog"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Все товары
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Нужна консультация?
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
            Наши специалисты помогут подобрать оптимальный комплект спецодежды с
            учетом особенностей вашей деятельности
          </p>
          <Link
            to="/contacts"
            className="btn-primary inline-flex items-center gap-2"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
