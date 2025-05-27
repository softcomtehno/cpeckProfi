export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  images: string[];
  inStock: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "workwear",
    name: "Рабочая одежда",
    icon: "Shirt",
    description:
      "Униформа и спецодежда для различных профессий и условий работы",
  },
  {
    id: "footwear",
    name: "Защитная обувь",
    icon: "Boot",
    description: "Специализированная обувь для защиты ног в рабочих условиях",
  },
  {
    id: "ppe",
    name: "Средства защиты",
    icon: "Shield",
    description: "Средства индивидуальной защиты для безопасной работы",
  },
  {
    id: "accessories",
    name: "Аксессуары",
    icon: "HardHat",
    description: "Дополнительные принадлежности для комплектации рабочего",
  },
  {
    id: "winter",
    name: "Зимняя одежда",
    icon: "Snowflake",
    description: "Утепленная спецодежда для работы в зимних условиях",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Костюм рабочий "Мастер"',
    category: "workwear",
    price: 3200,
    oldPrice: 3600,
    description:
      "Прочный костюм для строительных и ремонтных работ. Изготовлен из качественной смесовой ткани с высокой степенью износостойкости. Включает куртку и брюки с удобными карманами.",
    features: [
      "Материал: смесовая ткань (65% полиэстер, 35% хлопок)",
      "Плотность ткани: 240 г/м²",
      "Усиленные швы",
      "Множество функциональных карманов",
      "Светоотражающие элементы",
    ],
    sizes: ["44-46", "48-50", "52-54", "56-58", "60-62"],
    colors: ["Синий", "Черный", "Серый"],
    images: ["https://cps24.ru/_sh/7/793.webp"],
    inStock: true,
    isPopular: true,
    rating: 4.7,
    reviews: 24,
  },
  {
    id: 2,
    name: 'Ботинки защитные "Титан"',
    category: "footwear",
    price: 4500,
    description:
      "Защитные ботинки с композитным подноском и антипрокольной стелькой. Обеспечивают надежную защиту ног в промышленных условиях.",
    features: [
      "Композитный подносок (200 Дж)",
      "Антипрокольная стелька",
      "Маслобензостойкая подошва",
      "Амортизирующая вставка в пятке",
      "Водоотталкивающая обработка",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    colors: ["Черный"],
    images: [
      "https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 16,
  },
  {
    id: 3,
    name: 'Куртка зимняя "Полярник"',
    category: "winter",
    price: 6800,
    description:
      "Утепленная куртка для работы в условиях низких температур до -40°C. Водонепроницаемое покрытие и современный утеплитель обеспечивают надежную защиту от холода.",
    features: [
      "Материал верха: полиэстер с водоотталкивающей пропиткой",
      "Утеплитель: Тинсулейт 150 г/м²",
      "Капюшон с меховой опушкой",
      "Ветрозащитная планка",
      "Внутренние манжеты",
    ],
    sizes: ["48-50", "52-54", "56-58", "60-62"],
    colors: ["Темно-синий", "Черный"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-F_XMF9cQ07N9B2qn4sL7DkJdLXBE4q-VBQ&s",
    ],
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviews: 12,
  },
  {
    id: 4,
    name: 'Каска защитная "Безопасность"',
    category: "ppe",
    price: 990,
    oldPrice: 1200,
    description:
      "Защитная каска из прочного ABS пластика для защиты головы от механических повреждений и падающих предметов. Соответствует ГОСТ.",
    features: [
      "Материал: ABS пластик",
      "Регулируемое оголовье",
      "Подбородочный ремень",
      "Вентиляционные отверстия",
      "Срок службы: 5 лет",
    ],
    sizes: ["Универсальный (53-62 см)"],
    colors: ["Белый", "Красный", "Синий", "Желтый", "Зеленый"],
    images: [
      "https://btshop.by/upload/iblock/c45/kaska_zashchitnaya_shakhterskaya_somz_55_favori_t_hammer_rapid_oranzhevaya_77714.jpg",
    ],
    inStock: true,
    isPopular: true,
    rating: 4.5,
    reviews: 32,
  },
  {
    id: 5,
    name: 'Перчатки рабочие "Хваткость"',
    category: "accessories",
    price: 320,
    description:
      "Рабочие перчатки с нитриловым покрытием для строительных и монтажных работ. Обеспечивают надежный захват и защиту рук.",
    features: [
      "Бесшовная нейлоновая основа",
      "Нитриловое покрытие ладони",
      "Эластичная манжета",
      "Защита от истирания",
      "Масло- и бензостойкие",
    ],
    sizes: ["8", "9", "10", "11"],
    colors: ["Серый/Черный"],
    images: [
      "https://images.pexels.com/photos/4498141/pexels-photo-4498141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    inStock: true,
    rating: 4.3,
    reviews: 42,
  },
  {
    id: 6,
    name: 'Комбинезон защитный "Барьер"',
    category: "workwear",
    price: 2400,
    description:
      "Защитный комбинезон из нетканого материала для работы с химическими веществами и в пыльных условиях.",
    features: [
      "Материал: нетканый полипропилен + полиэтиленовая пленка",
      "Защита от твердых частиц и брызг химикатов",
      "Эластичные манжеты и капюшон",
      "Застежка-молния с защитным клапаном",
      "Одноразовый",
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Белый"],
    images: [
      "https://images.pexels.com/photos/3951355/pexels-photo-3951355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4492130/pexels-photo-4492130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviews: 8,
  },
  {
    id: 7,
    name: 'Сапоги резиновые "Водостой"',
    category: "footwear",
    price: 1850,
    description:
      "Резиновые сапоги с утеплителем для работы во влажных условиях. Защищают от воды и общих загрязнений.",
    features: [
      "Материал: ПВХ",
      "Съемный утепляющий вкладыш",
      "Рифленая подошва против скольжения",
      "Усиленный мысок",
      "Высота голенища: 38 см",
    ],
    sizes: ["41", "42", "43", "44", "45", "46"],
    colors: ["Черный", "Зеленый"],
    images: [
      "https://arizonatactical.ru/image/cache/data/Haix%20Black%20Eagle%202.1-500x700.jpg",
    ],
    inStock: true,
    rating: 4.4,
    reviews: 14,
  },
  {
    id: 8,
    name: 'Жилет сигнальный "Видимость"',
    category: "workwear",
    price: 550,
    description:
      "Сигнальный жилет повышенной видимости для работы на дорогах и в условиях плохой видимости.",
    features: [
      "Материал: 100% полиэстер",
      "Светоотражающие полосы 5 см",
      "Застежка на липучке",
      "Класс защиты: 2",
      "Соответствует ГОСТ 12.4.281-2014",
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Оранжевый", "Желтый"],
    images: [
      "https://vantrading.ru/image/cache/catalog/specodezda/signalnajaspecodezhda/signalnyezhilety/6cfb3437cc9e8da9a4396dad163ebe2d-1080x1080.jpg",
    ],
    inStock: true,
    isPopular: true,
    rating: 4.2,
    reviews: 22,
  },
];

// Функция для получения продуктов по категории
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

// Функция для получения популярных продуктов
export const getPopularProducts = (): Product[] => {
  return products.filter((product) => product.isPopular);
};

// Функция для получения новых продуктов
export const getNewProducts = (): Product[] => {
  return products.filter((product) => product.isNew);
};

// Функция для поиска продуктов
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );
};
