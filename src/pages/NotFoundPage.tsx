import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-neutral-50 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="text-primary-600 font-bold text-9xl mb-8">404</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Страница не найдена</h1>
        <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
          Запрашиваемая вами страница не существует или была удалена
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home size={18} />
            На главную
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn-outline flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Вернуться назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;