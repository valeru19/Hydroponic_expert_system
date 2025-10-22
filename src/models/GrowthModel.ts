/**
 * Модель роста растений в гидропонной системе
 * 
 * Этот класс представляет модель данных для симуляции роста растений.
 * Следует паттерну Model из MVC архитектуры и инкапсулирует:
 * - Состояние параметров симуляции
 * - Результаты расчетов
 * - Делегирование вычислений в SimulationService
 */

import { Parameters } from './Parameters';
import { SimulationResult } from './SimulationResult';
import { SimulationService } from '../services/simulationService';

/**
 * Модель роста растений
 * 
 * Управляет состоянием параметров симуляции и результатами расчетов.
 * Использует композицию с SimulationService для выполнения сложных вычислений.
 */
export class GrowthModel {
    /** Текущие параметры симуляции */
    private parameters: Parameters;
    
    /** Кэшированный результат последней симуляции */
    private result: SimulationResult | null;
    
    /** Сервис для выполнения математических расчетов симуляции */
    private simulationService: SimulationService;

    /**
     * Конструктор модели
     * 
     * Инициализирует модель значениями по умолчанию для салата.
     * Эти значения представляют оптимальные условия для выращивания салата.
     */
    constructor() {
        // Параметры по умолчанию для салата (оптимальные условия)
        this.parameters = {
            cropType: 'lettuce',        // Салат - базовая культура
            ph: 6.0,                    // Нейтральная кислотность
            ec: 1.5,                    // Средняя электропроводность
            airTemperature: 20,         // Комнатная температура
            solutionTemperature: 20,    // Температура раствора = температуре воздуха
            lightIntensity: 12000,      // Интенсивное освещение
            co2Level: 800,              // Нормальный уровень CO2
            humidity: 60,               // Умеренная влажность
            waterLevel: 100,            // Полный уровень воды
            oxygenLevel: 6              // Достаточный уровень кислорода
        };
        
        this.result = null; // Результат будет рассчитан при первом вызове simulate()
        this.simulationService = new SimulationService();
    }

    /**
     * Обновление параметров симуляции
     * 
     * @param params - Частичные параметры для обновления
     */
    setParameters(params: Partial<Parameters>) {
        // Объединяем существующие параметры с новыми
        this.parameters = { ...this.parameters, ...params };
    }

    /**
     * Получение текущих параметров
     * 
     * @returns Копия текущих параметров симуляции
     */
    getParameters(): Parameters {
        return { ...this.parameters };
    }

    /**
     * Получение результата последней симуляции
     * 
     * @returns Результат симуляции или null, если симуляция не выполнялась
     */
    getResult(): SimulationResult | null {
        return this.result;
    }

    /**
     * Выполнение симуляции роста растений
     * 
     * Делегирует все вычисления в SimulationService и кэширует результат.
     * 
     * @returns Результат симуляции с прогнозом урожайности и рекомендациями
     */
    simulate(): SimulationResult {
        // Перенаправляем всю логику моделирования в SimulationService
        // Это обеспечивает разделение ответственности: модель хранит данные, сервис выполняет вычисления
        this.result = this.simulationService.simulateGrowth(this.parameters);
        return this.result;
    }
}