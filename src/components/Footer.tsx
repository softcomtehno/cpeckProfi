import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CreditCard,
  Truck,
  Shield,
  Facebook,
  Instagram,
  Headphones,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* О компании */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">СпецПрофи</h3>
            <p className="text-neutral-300 mb-4">
              Интернет-магазин качественной спецодежды и средств защиты для
              работы в любых условиях.
            </p>
            <div className="flex flex-col space-y-2 text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-secondary-500" />
                <span>г. Бишкек, Улица Исакеева, 34/1</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-secondary-500" />
                <span>+996 500 90-90-90</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-secondary-500" />
                <span>info@specprofi.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-secondary-500" />
                <span>Пн-Пт: 9:00-18:00</span>
              </div>
            </div>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Каталог</h3>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <Link
                  to="/catalog/workwear"
                  className="hover:text-secondary-400 transition"
                >
                  Рабочая одежда
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/footwear"
                  className="hover:text-secondary-400 transition"
                >
                  Защитная обувь
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/ppe"
                  className="hover:text-secondary-400 transition"
                >
                  Средства защиты
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/accessories"
                  className="hover:text-secondary-400 transition"
                >
                  Аксессуары
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/winter"
                  className="hover:text-secondary-400 transition"
                >
                  Зимняя одежда
                </Link>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Информация</h3>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <Link
                  to="/about"
                  className="hover:text-secondary-400 transition"
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="hover:text-secondary-400 transition"
                >
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-secondary-400 transition"
                >
                  Возврат товара
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="hover:text-secondary-400 transition"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-secondary-400 transition"
                >
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          {/* Преимущества */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              Наши преимущества
            </h3>
            <ul className="space-y-4 text-neutral-300">
              <li className="flex items-center gap-2">
                <Truck size={20} className="text-secondary-500" />
                <span>Быстрая доставка по всей Бишкеку</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard size={20} className="text-secondary-500" />
                <span>Удобные способы оплаты</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield size={20} className="text-secondary-500" />
                <span>Гарантия качества на все товары</span>
              </li>
              <li className="flex items-center gap-2">
                <Headphones size={20} className="text-secondary-500" />
                <span>Профессиональная консультация</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            © 2025 СпецПрофи — интернет-магазин спецодежды. Все права защищены.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
