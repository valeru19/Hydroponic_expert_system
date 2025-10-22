/**
 * Точка входа в приложение - экспертная система для гидропоники
 * 
 * Этот файл инициализирует React приложение и монтирует его в DOM.
 * Использует React.StrictMode для дополнительных проверок в режиме разработки.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

/**
 * Инициализация и монтирование React приложения
 * 
 * ReactDOM.render устарел в React 18+, но используется для совместимости
 * В новых версиях рекомендуется использовать createRoot API
 */
ReactDOM.render(
    <React.StrictMode>
        {/* StrictMode помогает выявить проблемы в приложении */}
        <App />
    </React.StrictMode>,
    document.getElementById('root') // Монтируем приложение в элемент с id="root"
);