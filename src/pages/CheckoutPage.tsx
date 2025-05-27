import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {
  CreditCard,
  Truck,
  User,
  MapPin,
  Phone,
  Mail,
  Check,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

type DeliveryMethod = "courier" | "pickup" | "post";
type PaymentMethod = "card" | "cash";

const CheckoutPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Состояние для хранения данных формы заказа
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    comment: "",
  });

  // Состояние для способов доставки и оплаты
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("courier");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  // Состояние для отображения ошибок валидации
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Стоимость доставки в зависимости от метода
  const getDeliveryCost = (): number => {
    switch (deliveryMethod) {
      case "courier":
        return totalPrice > 5000 ? 0 : 350;
      case "pickup":
        return 0;
      case "post":
        return 450;
      default:
        return 0;
    }
  };

  // Функция форматирования цены
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сом";
  };

  // Обработчик изменения полей формы
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Сбрасываем ошибку поля при изменении
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Валидация формы
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Введите имя";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Введите фамилию";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введите телефон";
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Некорректный формат телефона";
    }

    if (deliveryMethod !== "pickup") {
      if (!formData.address.trim()) {
        newErrors.address = "Введите адрес";
      }

      if (!formData.city.trim()) {
        newErrors.city = "Введите город";
      }

      if (!formData.postalCode.trim()) {
        newErrors.postalCode = "Введите индекс";
      } else if (!/^\d{6}$/.test(formData.postalCode.trim())) {
        newErrors.postalCode = "Индекс должен содержать 6 цифр";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Эмуляция отправки заказа
      setTimeout(() => {
        // Сохраняем заказ в localStorage
        const order = {
          id: `ORD-${Date.now()}`,
          date: new Date().toISOString(),
          items: cartItems,
          total: totalPrice + getDeliveryCost(),
          deliveryMethod,
          paymentMethod,
          customer: formData,
        };

        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        // Очищаем корзину
        clearCart();

        // Показываем уведомление об успешном оформлении
        toast.success("Заказ успешно оформлен!");

        // Переходим на страницу успеха
        navigate("/");
      }, 1000);
    } else {
      toast.error("Пожалуйста, проверьте правильность заполнения формы");
    }
  };

  // Если корзина пуста, перенаправляем на страницу корзины
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Оформление заказа</h1>
        <p className="text-lg mb-6">
          Ваша корзина пуста. Добавьте товары для оформления заказа.
        </p>
        <button onClick={() => navigate("/catalog")} className="btn-primary">
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Левая колонка - данные для заказа */}
            <div>
              {/* Информация о покупателе */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <User size={20} className="text-primary-600" />
                  Данные покупателя
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Имя*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`input ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                      placeholder="Иван"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Фамилия*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`input ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                      placeholder="Иванов"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="example@mail.ru"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Телефон*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="+7 (999) 123-45-67"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Доставка */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Truck size={20} className="text-primary-600" />
                  Способ доставки
                </h2>

                <div className="space-y-4 mb-6">
                  <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      className="mt-1"
                      checked={deliveryMethod === "courier"}
                      onChange={() => setDeliveryMethod("courier")}
                    />
                    <div className="ml-3">
                      <div className="font-medium">Курьерская доставка</div>
                      <p className="text-sm text-neutral-600">
                        Доставка курьером по адресу (1-2 дня)
                        {totalPrice > 5000 ? " — Бесплатно" : " — 350 сом"}
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      className="mt-1"
                      checked={deliveryMethod === "pickup"}
                      onChange={() => setDeliveryMethod("pickup")}
                    />
                    <div className="ml-3">
                      <div className="font-medium">Самовывоз</div>
                      <p className="text-sm text-neutral-600">
                        Забрать из нашего магазина — Бесплатно
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      className="mt-1"
                      checked={deliveryMethod === "post"}
                      onChange={() => setDeliveryMethod("post")}
                    />
                    <div className="ml-3">
                      <div className="font-medium">Почта Бишкеку</div>
                      <p className="text-sm text-neutral-600">
                        Доставка Почтой Бишкеку (3-7 дней) — 450 сом
                      </p>
                    </div>
                  </label>
                </div>

                {deliveryMethod !== "pickup" && (
                  <div className="space-y-4">
                    <h3 className="font-medium mb-2">Адрес доставки</h3>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Город*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`input ${
                          errors.city ? "border-red-500" : ""
                        }`}
                        placeholder="Москва"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Адрес*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`input ${
                          errors.address ? "border-red-500" : ""
                        }`}
                        placeholder="ул. Примерная, д. 123, кв. 45"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Индекс*
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={`input ${
                          errors.postalCode ? "border-red-500" : ""
                        }`}
                        placeholder="123456"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Оплата */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <CreditCard size={20} className="text-primary-600" />
                  Способ оплаты
                </h2>

                <div className="space-y-4">
                  <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="mt-1"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <div className="ml-3">
                      <div className="font-medium">Банковская карта</div>
                      <p className="text-sm text-neutral-600">
                        Visa, MasterCard, МИР
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="mt-1"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                    />
                    <div className="ml-3">
                      <div className="font-medium">Наличными при получении</div>
                      <p className="text-sm text-neutral-600">
                        Оплата при доставке курьеру или в пункте выдачи
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Комментарий */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Комментарий к заказу</h2>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                  className="input"
                  placeholder="Дополнительная информация к заказу..."
                ></textarea>
              </div>
            </div>

            {/* Правая колонка - сводка заказа */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>

                {/* Список товаров */}
                <div className="max-h-60 overflow-y-auto mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-4 py-3 border-b border-neutral-200 last:border-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <div className="text-sm text-neutral-600">
                          {item.size && (
                            <span>Размер: {item.size} &bull; </span>
                          )}
                          {item.color && (
                            <span>Цвет: {item.color} &bull; </span>
                          )}
                          <span>Кол-во: {item.quantity}</span>
                        </div>
                        <p className="font-bold mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Сводка по стоимости */}
                <div className="border-t border-b border-neutral-200 py-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Сумма заказа:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span>
                      {getDeliveryCost() === 0
                        ? "Бесплатно"
                        : formatPrice(getDeliveryCost())}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 font-bold text-lg">
                  <span>Итого к оплате:</span>
                  <span>{formatPrice(totalPrice + getDeliveryCost())}</span>
                </div>

                {/* Информация о защите данных */}
                <div className="bg-primary-50 p-3 rounded-md text-sm text-neutral-700 mb-6 flex items-start gap-2">
                  <Info
                    size={18}
                    className="text-primary-600 mt-0.5 flex-shrink-0"
                  />
                  <p>
                    Нажимая кнопку «Оформить заказ», вы соглашаетесь с условиями
                    обработки персональных данных и пользовательским соглашением
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn-secondary w-full flex items-center justify-center gap-2 py-3"
                >
                  <Check size={18} />
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
