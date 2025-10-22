/**
 * Главный компонент приложения - экспертная система для гидропоники
 * 
 * Этот файл является точкой входа в приложение и инициализирует:
 * - Модель роста растений (GrowthModel)
 * - Контроллер для управления симуляцией (GrowthController)
 * - Основной интерфейс симулятора (GrowthSimulator)
 * 
 * Архитектура следует паттерну MVC (Model-View-Controller):
 * - Model: GrowthModel - содержит данные и бизнес-логику
 * - View: GrowthSimulator - отображает интерфейс пользователя
 * - Controller: GrowthController - управляет взаимодействием между моделью и представлением
 */

import React from 'react';
import './styles/global.css';
import Layout from './components/Layout';
import { GrowthSimulator } from './components/GrowthSimulator';
import { GrowthModel } from './models/GrowthModel';
import { GrowthController } from './controllers/GrowthController';

/**
 * Главный компонент приложения
 * Инициализирует модель данных и контроллер для экспертной системы гидропоники
 */
const App: React.FC = () => {
  // Создаем экземпляр модели роста растений
  // Модель содержит параметры симуляции и методы для их обработки
  const model = new GrowthModel();
  
  // Создаем контроллер, который управляет взаимодействием между моделью и представлением
  // Контроллер инкапсулирует бизнес-логику и предоставляет API для компонентов
  const controller = new GrowthController(model);

  return (
    <Layout>
      <div id="simulator" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="content-flex">
          <div className="main-card">
            {/* Основной компонент симулятора роста растений */}
            <GrowthSimulator controller={controller} />
          </div>
          <section style={{ margin: 16 }}>
            {/* Калькулятор удалён — список культур теперь расширён в data/crops.ts */}
            {/* В будущем здесь может быть размещен дополнительный функционал */}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default App;