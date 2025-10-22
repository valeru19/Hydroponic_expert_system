/**
 * Модели данных для параметров культур в гидропонной системе
 * 
 * Этот файл определяет структуры данных для хранения оптимальных параметров
 * выращивания различных культур в гидропонных системах.
 */

/**
 * Диапазон значений параметра с критическими границами
 * 
 * @param min - Минимальное оптимальное значение
 * @param max - Максимальное оптимальное значение
 * @param criticalMin - Критический минимум (ниже этого значения растение погибнет)
 * @param criticalMax - Критический максимум (выше этого значения растение погибнет)
 */
export interface ParameterRange {
    min: number;
    max: number;
    // критические границы (необязательные)
    criticalMin?: number;
    criticalMax?: number;
}

/**
 * Оптимальные параметры выращивания для конкретной культуры
 * 
 * Содержит диапазоны значений для всех ключевых параметров гидропонной системы.
 * Каждый параметр имеет оптимальный диапазон и критические границы.
 */
export interface CropOptimalParameters {
    ph: ParameterRange;                    // Кислотность раствора
    ec: ParameterRange;                    // Электропроводность раствора
    airTemperature: ParameterRange;        // Температура воздуха
    solutionTemperature: ParameterRange;   // Температура раствора
    lightIntensity: ParameterRange;        // Интенсивность освещения
    co2Level: ParameterRange;              // Уровень углекислого газа
    humidity: ParameterRange;              // Влажность воздуха
    waterLevel: ParameterRange;            // Уровень воды в системе
    oxygenLevel: ParameterRange;            // Уровень кислорода в растворе
}

/**
 * Временные параметры роста культуры
 * 
 * @param optimal - Оптимальное время роста в днях
 * @param max - Максимальное время роста в днях (при неоптимальных условиях)
 */
export interface GrowthTime {
    optimal: number;
    max: number;
}

/**
 * Полная конфигурация культуры для гидропонной системы
 * 
 * @param name - Название культуры на русском языке
 * @param optimal - Оптимальные параметры выращивания
 * @param growthTime - Временные параметры роста
 * @param maxYield - Максимальный урожай в граммах
 */
export interface CropConfig {
    name: string;
    optimal: CropOptimalParameters;
    // теперь growthTime — объект с оптимальным и максимальным временем
    growthTime: GrowthTime;
    maxYield: number;
}

/**
 * Тип карты параметров культур
 * 
 * Определяет все доступные культуры в системе с их конфигурациями.
 * Используется для типобезопасного доступа к параметрам культур.
 */
export type CropParametersMap = {
    [key in
      | 'lettuce'      // Салат
      | 'tomatoes'     // Томаты
      | 'basil'        // Базилик
      | 'cucumber'     // Огурец
      | 'spinach'      // Шпинат
      | 'pepper'       // Перец
      | 'strawberries' // Клубника
      | 'kale'         // Капуста кале
      | 'microgreens'  // Микрозелень
      | 'cilantro'     // Кинза
      | 'mint']: CropConfig; // Мята
};