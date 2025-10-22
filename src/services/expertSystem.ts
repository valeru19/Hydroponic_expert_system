/**
 * Простая экспертная система для генерации рекомендаций
 * 
 * Этот файл содержит базовую логику экспертной системы с правилами
 * для анализа параметров гидропонной системы и генерации рекомендаций.
 * 
 * ВНИМАНИЕ: Этот сервис является упрощенной версией. Основная логика
 * экспертной системы находится в SimulationService, который содержит
 * более сложные математические модели и учитывает специфику культур.
 */

/**
 * Интерфейс параметров для простой экспертной системы
 * 
 * Упрощенная версия параметров, используемая в базовых правилах.
 * Основная система использует более детальный интерфейс Parameters.
 */
interface Parameters {
    ph: number;              // Кислотность раствора
    ec: number;              // Электропроводность
    airTemp: number;         // Температура воздуха
    solutionTemp: number;    // Температура раствора
    light: number;           // Интенсивность света
    co2: number;            // Уровень CO2
    humidity: number;        // Влажность
    waterLevel: number;      // Уровень воды
    oxygen: number;          // Уровень кислорода
}

/**
 * Интерфейс рекомендации экспертной системы
 */
interface Recommendation {
    message: string;  // Описание проблемы
    action: string;   // Рекомендуемое действие
}

/**
 * Генерация рекомендаций на основе параметров
 * 
 * Анализирует параметры гидропонной системы и генерирует рекомендации
 * по их оптимизации. Использует простые правила для базовых параметров.
 * 
 * @param params - Параметры для анализа
 * @returns Массив рекомендаций
 */
export function generateRecommendations(params: Parameters): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Правило для pH: оптимальный диапазон 5.5-6.5
    if (params.ph < 5.5 || params.ph > 6.5) {
        recommendations.push({
            message: "pH level is out of optimal range.",
            action: "Adjust pH level to between 5.5 and 6.5."
        });
    }

    // Правило для EC: оптимальный диапазон 1.2-2.0
    if (params.ec < 1.2 || params.ec > 2.0) {
        recommendations.push({
            message: "EC level is out of optimal range.",
            action: "Adjust EC level to between 1.2 and 2.0."
        });
    }

    // Правило для температуры воздуха: оптимальный диапазон 18-24°C
    if (params.airTemp < 18 || params.airTemp > 24) {
        recommendations.push({
            message: "Air temperature is not optimal.",
            action: "Maintain air temperature between 18°C and 24°C."
        });
    }

    // Правило для температуры раствора: оптимальный диапазон 18-22°C
    if (params.solutionTemp < 18 || params.solutionTemp > 22) {
        recommendations.push({
            message: "Solution temperature is not optimal.",
            action: "Maintain solution temperature between 18°C and 22°C."
        });
    }

    // TODO: Добавить дополнительные правила для других параметров
    // Например: свет, CO2, влажность, уровень воды, кислород

    return recommendations;
}