/**
 * Сервис симуляции роста растений в гидропонной системе
 * 
 * Это ядро экспертной системы, содержащее математическую модель для расчета:
 * - Жизнеспособности растений
 * - Ожидаемой урожайности
 * - Времени роста
 * - Рекомендаций по оптимизации
 * 
 * Математическая модель основана на:
 * 1. Линейной нормализации параметров между критическими и оптимальными границами
 * 2. Нелинейной степенной функции для учета важности параметров
 * 3. Мультипликативном комбинировании влияний всех параметров
 * 4. Штрафах за взаимодействия между параметрами (особенно pH ↔ EC)
 */

import { Parameters } from '../models/Parameters';
import { SimulationResult } from '../models/SimulationResult';
import { CROP_PARAMETERS } from '../constants/cropParameters';
import { CropOptimalParameters } from '../models/CropParameters';

/**
 * Тип ключей параметров, общих для Parameters и CropOptimalParameters
 * Используется для типобезопасного доступа к параметрам
 */
type ParameterKey = Extract<keyof Parameters, keyof CropOptimalParameters>;

/**
 * Сервис симуляции роста растений
 * 
 * Реализует сложную математическую модель для прогнозирования роста растений
 * в гидропонных системах на основе входных параметров.
 */
export class SimulationService {
    /**
     * Веса параметров для расчета влияния на урожайность
     * 
     * Чем выше вес, тем сильнее параметр влияет на результат.
     * Веса основаны на агрономических исследованиях и опыте выращивания.
     */
    private PARAM_WEIGHTS: Record<ParameterKey, number> = {
        ph: 1.2,                    // Кислотность - критически важна для усвоения питательных веществ
        ec: 1.5,                     // Электропроводность - определяет концентрацию питательных веществ
        airTemperature: 1.0,         // Температура воздуха - влияет на метаболизм
        solutionTemperature: 1.0,    // Температура раствора - влияет на корневую систему
        lightIntensity: 1.3,        // Освещение - критично для фотосинтеза
        co2Level: 0.9,              // CO2 - важен для фотосинтеза, но менее критичен
        humidity: 0.6,              // Влажность - влияет на транспирацию
        waterLevel: 0.7,            // Уровень воды - важен для гидропоники
        oxygenLevel: 1.4            // Кислород - критичен для корневой системы
    } as Record<ParameterKey, number>;

    /**
     * Основной метод симуляции роста растений
     * 
     * Выполняет полный цикл анализа параметров и расчета прогноза:
     * 1. Проверяет жизнеспособность растения
     * 2. Рассчитывает ожидаемую урожайность
     * 3. Определяет время роста
     * 4. Генерирует рекомендации
     * 
     * @param params - Входные параметры симуляции
     * @returns Полный результат симуляции с прогнозом и рекомендациями
     */
    simulateGrowth(params: Parameters): SimulationResult {
        // Получаем конфигурацию для выбранной культуры
        const cropParams = CROP_PARAMETERS[params.cropType];
        
        // Массивы для сбора проблем и рекомендаций
        const issues: string[] = [];
        const recommendations: string[] = [];

        // 1. Проверяем жизнеспособность растения (критические границы)
        const isViable = this.checkViability(params, cropParams, issues);
        
        // 2. Рассчитываем урожайность в процентах от максимальной
        const yieldPercentage = this.calculateYield(params, cropParams, issues);
        
        // 3. Определяем время роста с учетом условий
        const growthTime = this.calculateGrowthTime(params, cropParams);

        // 4. Рассчитываем абсолютные показатели урожайности
        // Ожидаемые граммы на основе процента от максимального урожая культуры
        const expectedGrams = Math.round((cropParams.maxYield || 0) * (yieldPercentage / 100));
        
        // Урожайность в кг/м² (предполагаем площадь 1 м²)
        // Переводим граммы в килограммы с округлением до 2 знаков после запятой
        const yieldPerSquareMeter = Math.round((expectedGrams / 1000) * 100) / 100;

        // 5. Генерируем рекомендации по оптимизации
        this.generateRecommendations(params, cropParams, recommendations);

        // Возвращаем полный результат симуляции
        return { isViable, yieldPercentage, expectedGrams, yieldPerSquareMeter, growthTime, issues, recommendations };
    }

    /**
     * Получение списка всех параметров для анализа
     * 
     * @returns Массив ключей параметров для итерации
     */
    private parameterKeys(): ParameterKey[] {
        return [
            'ph', 'ec', 'airTemperature', 'solutionTemperature',
            'lightIntensity', 'co2Level', 'humidity', 'waterLevel', 'oxygenLevel'
        ] as ParameterKey[];
    }

    /**
     * Проверка жизнеспособности растения
     * 
     * Проверяет, находятся ли все параметры в критических границах.
     * Если хотя бы один параметр выходит за критические границы - растение погибнет.
     * 
     * @param params - Входные параметры
     * @param config - Конфигурация культуры
     * @param issues - Массив для записи проблем
     * @returns true если растение жизнеспособно, false если погибнет
     */
    private checkViability(params: Parameters, config: { optimal: CropOptimalParameters; growthTime: any; }, issues: string[]): boolean {
        let isViable = true;
        
        // Проверяем каждый параметр на соответствие критическим границам
        this.parameterKeys().forEach((key) => {
            const value = params[key] as number;
            const limits = config.optimal[key];
            
            // Используем критические границы, если они заданы, иначе - обычные
            const cmin = limits.criticalMin ?? limits.min;
            const cmax = limits.criticalMax ?? limits.max;

            // Если значение выходит за критические границы - растение погибнет
            if (value < cmin || value > cmax) {
                isViable = false;
                issues.push(`${this.getParameterName(key)}: ${value} вне допустимого диапазона (${cmin}–${cmax}) — риск гибели.`);
            }
        });
        
        return isViable;
    }

    /**
     * Расчет урожайности на основе параметров
     * 
     * Это ключевой метод экспертной системы, реализующий сложную математическую модель:
     * 1. Линейная нормализация параметров между критическими и оптимальными границами
     * 2. Применение нелинейной степенной функции с учетом весов параметров
     * 3. Мультипликативное комбинирование влияний всех параметров
     * 4. Штраф за взаимодействие между pH и EC
     * 
     * @param params - Входные параметры
     * @param config - Конфигурация культуры
     * @param issues - Массив для записи проблем
     * @returns Урожайность в процентах от максимальной (0-100)
     */
    private calculateYield(params: Parameters, config: { optimal: CropOptimalParameters; growthTime: any; }, issues: string[]): number {
        let yieldMultiplier = 1.0; // Начальный множитель урожайности
        const deviations: Record<string, number> = {}; // Отклонения параметров

        // Анализируем влияние каждого параметра на урожайность
        this.parameterKeys().forEach((key) => {
            const value = params[key] as number;
            const limits = config.optimal[key];

            // Если параметр в оптимальном диапазоне - влияние = 1 (без потерь)
            if (value >= limits.min && value <= limits.max) {
                deviations[key] = 0;
                return;
            }

            const cmin = limits.criticalMin ?? limits.min;
            const cmax = limits.criticalMax ?? limits.max;

            // Шаг 1: Линейная нормализация между критическими и оптимальными границами
            // Возвращает значение от 0 до 1, где 1 = оптимальное значение
            const linear = this.computeLinearNormalized(value, limits.min, limits.max, cmin, cmax);

            // Шаг 2: Применение нелинейной степенной функции
            // Чем выше вес параметра, тем сильнее штраф за отклонение
            const weight = this.PARAM_WEIGHTS[key];
            const impact = Math.pow(Math.max(0.01, linear), 1 + weight); // минимум 0.01 чтобы не было нулевой урожайности

            // Шаг 3: Мультипликативное комбинирование влияний
            yieldMultiplier *= impact;
            deviations[key] = Math.abs(1 - impact);

            // Записываем проблему, если влияние меньше 100%
            if (impact < 1) {
                issues.push(`${this.getParameterName(key)}: ${value} вне оптимума (${limits.min}–${limits.max}), влияние ≈ ${Math.round(impact * 100)}%.`);
            }
        });

        // Шаг 4: Штраф за взаимодействие между pH и EC
        // Если оба параметра сильно отклонены - дополнительное снижение урожайности
        const ecDev = deviations['ec'] ?? 0;
        const phDev = deviations['ph'] ?? 0;
        if (ecDev > 0.2 && phDev > 0.15) {
            const interactionPenalty = 0.9; // 10% дополнительного уменьшения
            yieldMultiplier *= interactionPenalty;
        }

        // Ограничение результата и перевод в проценты
        const pct = Math.max(0, Math.round(yieldMultiplier * 100));
        return pct;
    }

    /**
     * Расчет времени роста растения
     * 
     * Определяет время до сбора урожая с учетом влияния параметров.
     * При неоптимальных условиях время роста увеличивается.
     * 
     * @param params - Входные параметры
     * @param config - Конфигурация культуры
     * @returns Время роста в днях
     */
    private calculateGrowthTime(params: Parameters, config: { optimal: CropOptimalParameters; growthTime: { optimal: number; max: number } }): number {
        const optimal = config.growthTime.optimal; // Оптимальное время роста
        const max = config.growthTime.max; // Максимальное время роста
        let multiplier = 1.0; // Множитель времени

        // Увеличиваем время роста при неоптимальных условиях
        if (params.airTemperature < config.optimal.airTemperature.min) multiplier *= 1.5; // Низкая температура
        if (params.lightIntensity < config.optimal.lightIntensity.min) multiplier *= 1.3; // Недостаток света
        if (params.co2Level < config.optimal.co2Level.min) multiplier *= 1.2; // Недостаток CO2

        // Ограничиваем максимальным временем роста
        return Math.min(Math.round(optimal * multiplier), max);
    }

    /**
     * Вычисление линейной нормализованной доли между критическими и оптимальными границами
     * 
     * Это ключевая математическая функция для нормализации параметров.
     * Возвращает значение от 0 до 1, где:
     * - 1 = параметр в оптимальном диапазоне
     * - 0 = параметр на критической границе
     * - Промежуточные значения = линейная интерполяция
     * 
     * @param value - Текущее значение параметра
     * @param min - Минимальное оптимальное значение
     * @param max - Максимальное оптимальное значение
     * @param cmin - Критический минимум
     * @param cmax - Критический максимум
     * @returns Нормализованное значение от 0 до 1
     */
    private computeLinearNormalized(value: number, min: number, max: number, cmin: number, cmax: number): number {
        // Если значение ниже оптимального диапазона
        if (value < min) {
            if (cmin >= min) return 0; // Если критический минимум >= оптимума, то 0
            const norm = (value - cmin) / (min - cmin); // Линейная интерполяция
            return clamp(norm, 0, 1);
        }
        
        // Если значение выше оптимального диапазона
        if (value > max) {
            if (cmax <= max) return 0; // Если критический максимум <= оптимума, то 0
            const norm = (cmax - value) / (cmax - max); // Линейная интерполяция
            return clamp(norm, 0, 1);
        }
        
        // Если значение в оптимальном диапазоне
        return 1;
    }

    private getParameterName(key: ParameterKey): string {
        const names: Record<ParameterKey, string> = {
            ph: 'pH',
            ec: 'EC',
            airTemperature: 'Температура воздуха',
            solutionTemperature: 'Температура раствора',
            lightIntensity: 'Интенсивность света',
            co2Level: 'Уровень CO2',
            humidity: 'Влажность',
            waterLevel: 'Уровень воды',
            oxygenLevel: 'Уровень кислорода'
        };
        return names[key];
    }

    private generateRecommendations(params: Parameters, config: { optimal: CropOptimalParameters; growthTime: any }, recs: string[]): void {
        this.parameterKeys().forEach((key) => {
            const value = params[key] as number;
            const limits = config.optimal[key];
            if (value < limits.min) {
                recs.push(`Увеличьте ${this.getParameterName(key)} до ${limits.min}–${limits.max} (сейчас ${value}).`);
            } else if (value > limits.max) {
                recs.push(`Уменьшите ${this.getParameterName(key)} до ${limits.min}–${limits.max} (сейчас ${value}).`);
            }
        });

        // специфичная рекомендация для EC↔pH взаимодействия
        const ec = params.ec;
        const ph = params.ph;
        if (Math.abs(ec - (config.optimal.ec.min + config.optimal.ec.max) / 2) > 0.8 &&
            Math.abs(ph - (config.optimal.ph.min + config.optimal.ph.max) / 2) > 0.4) {
            recs.push('Уровни pH и EC сильно отклонены одновременно — скорректируйте pH и/или проводимость для восстановления баланса питательных веществ.');
        }
    }
}

/**
 * Утилитарная функция для ограничения значения в заданном диапазоне
 * 
 * @param v - Значение для ограничения
 * @param a - Минимальное значение (по умолчанию 0)
 * @param b - Максимальное значение (по умолчанию 1)
 * @returns Значение, ограниченное диапазоном [a, b]
 */
function clamp(v: number, a = 0, b = 1) { 
    return Math.max(a, Math.min(b, v)); 
}