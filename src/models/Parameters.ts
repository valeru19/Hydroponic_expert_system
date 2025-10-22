/**
 * Модель параметров для симуляции роста растений в гидропонике
 * 
 * Этот файл определяет основные типы данных, используемые в экспертной системе:
 * - CropType: тип культуры (ключ из базы знаний)
 * - Parameters: интерфейс входных параметров для симуляции
 */

/**
 * Тип культуры - динамически извлекается из константы CROP_PARAMETERS
 * Это обеспечивает типобезопасность и автоматическое обновление при добавлении новых культур
 */
export type CropType = keyof typeof import('../constants/cropParameters').CROP_PARAMETERS;

/**
 * Интерфейс параметров симуляции роста растений
 * 
 * Содержит все ключевые параметры, влияющие на рост растений в гидропонной системе:
 * 
 * @param cropType - Тип выращиваемой культуры (салат, томаты, базилик и т.д.)
 * @param ph - Кислотность питательного раствора (5.0-7.0)
 * @param ec - Электропроводность раствора, мСм/см (0.8-4.0)
 * @param airTemperature - Температура воздуха, °C (10-30)
 * @param solutionTemperature - Температура питательного раствора, °C (15-28)
 * @param lightIntensity - Интенсивность освещения, люкс (8000-35000)
 * @param co2Level - Уровень углекислого газа, ppm (400-2000)
 * @param humidity - Влажность воздуха, % (40-90)
 * @param waterLevel - Уровень воды в системе, % (40-100)
 * @param oxygenLevel - Уровень кислорода в растворе, мг/л (3-11)
 */
export interface Parameters {
    cropType: CropType;
    ph: number;
    ec: number;
    airTemperature: number;
    solutionTemperature: number;
    lightIntensity: number;
    co2Level: number;
    humidity: number;
    waterLevel: number;
    oxygenLevel: number;
}