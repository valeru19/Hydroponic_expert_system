/**
 * Компонент макета приложения
 * 
 * Предоставляет общую структуру страницы с:
 * - Заголовком и навигацией
 * - Героическим разделом с описанием
 * - Основным контентом
 * - Подвалом с копирайтом
 */

import React from 'react';

/**
 * Компонент макета приложения
 * 
 * Создает общую структуру страницы с заголовком, навигацией,
 * героическим разделом и подвалом. Стили применяются через CSS классы.
 * 
 * @param children - Дочерние компоненты для отображения в основном контенте
 */
const Layout: React.FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <div>
      {/* Заголовок с логотипом и навигацией */}
      <header className="header">
        <div className="container" style={{maxWidth:1200,margin:'0 auto',padding:'0 16px'}}>
          <div className="logo">
            <img src="/assets/logo.svg" alt="logo" />
            <div>Hydroponics Expert</div>
          </div>
          <nav style={{display:'flex',gap:16}}>
            <a href="#simulator" style={{color:'rgba(255,255,255,0.9)'}}>Симулятор</a>
            <a href="#about" style={{color:'rgba(255,255,255,0.9)'}}>О продукте</a>
            <a href="#contacts" className="button" style={{background:'rgba(255,255,255,0.14)'}}>Контакты</a>
          </nav>
        </div>
      </header>

      {/* Основной контент */}
      <section className="layout" style={{paddingTop:20}}>
        {/* Героический раздел с описанием продукта */}
        <div className="hero">
          <div className="hero-inner">
            <h1>Интеллектуальная система для гидропоники</h1>
            <p>Анализируйте параметры раствора и микроклимата, получайте рекомендации по уходу и прогноз урожайности.</p>
            <a href="#simulator" className="button" style={{marginTop:10}}>Перейти к симулятору</a>
          </div>
        </div>

        {/* Основной контент приложения */}
        {children}

        {/* Подвал с копирайтом */}
        <footer style={{marginTop:32,textAlign:'center',color:'#6b7280',padding:'28px 0'}}>
          <div>© {new Date().getFullYear()} Hydroponics Expert — Все права защищены</div>
        </footer>
      </section>
    </div>
  );
};

export default Layout;