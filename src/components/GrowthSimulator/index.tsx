/**
 * Главный компонент симулятора роста растений
 * 
 * Это основной интерфейс экспертной системы, который предоставляет:
 * - Форму для ввода параметров гидропонной системы
 * - Выбор типа культуры
 * - Отображение результатов симуляции
 * - Рекомендации по оптимизации
 * 
 * Компонент следует паттерну View из MVC архитектуры и взаимодействует
 * с контроллером для обновления модели и получения результатов.
 */

import React, { useState } from 'react';
import { GrowthController } from '../../controllers/GrowthController';
import { SimulationResult } from '../../models/SimulationResult';
import { Parameters } from '../../models/Parameters';
import { CROP_PARAMETERS } from '../../constants/cropParameters';
import ParameterSidebar from '../ParameterSidebar';

/**
 * Пропсы компонента симулятора
 */
interface GrowthSimulatorProps {
    /** Контроллер для управления симуляцией */
    controller: GrowthController;
}

/**
 * Главный компонент симулятора роста растений
 * 
 * Предоставляет полный интерфейс для работы с экспертной системой гидропоники.
 * Позволяет пользователю вводить параметры, выбирать культуру и получать
 * прогнозы и рекомендации от экспертной системы.
 */
export const GrowthSimulator: React.FC<GrowthSimulatorProps> = ({ controller }) => {
    /** Текущие параметры симуляции */
    const [parameters, setParameters] = useState<Parameters>(controller.getParameters());
    
    /** Результат последней симуляции */
    const [result, setResult] = useState<SimulationResult | null>(null);
    
    /** Выбранная культура для выращивания */
    const [selectedPlant, setSelectedPlant] = useState<string>('lettuce');

    /** Ключи доступных культур из базы знаний */
    const cropKeys = Object.keys(CROP_PARAMETERS) as Array<keyof typeof CROP_PARAMETERS>;

    /**
     * Список доступных растений для выращивания
     * Включает русские названия и научные латинские названия
     */
    const plantOptions = [
        { value: 'lettuce', label: 'Салат', scientificName: 'Lactuca sativa' },
        { value: 'basil', label: 'Базилик', scientificName: 'Ocimum basilicum' },
        { value: 'tomato', label: 'Томаты', scientificName: 'Solanum lycopersicum' },
        { value: 'spinach', label: 'Шпинат', scientificName: 'Spinacia oleracea' },
        { value: 'arugula', label: 'Руккола', scientificName: 'Eruca sativa' },
        { value: 'kale', label: 'Кейл', scientificName: 'Brassica oleracea var. sabellica' },
        { value: 'chard', label: 'Мангольд', scientificName: 'Beta vulgaris var. cicla' },
        { value: 'pepper', label: 'Перец', scientificName: 'Capsicum annuum' },
        { value: 'cucumber', label: 'Огурец', scientificName: 'Cucumis sativus' },
        { value: 'strawberry', label: 'Клубника', scientificName: 'Fragaria × ananassa' },
        { value: 'mint', label: 'Мята', scientificName: 'Mentha' },
        { value: 'parsley', label: 'Петрушка', scientificName: 'Petroselinum crispum' },
        { value: 'cilantro', label: 'Кинза', scientificName: 'Coriandrum sativum' },
        { value: 'eggplant', label: 'Баклажан', scientificName: 'Solanum melongena' }
    ];

    /**
     * Обработчик изменения параметра
     * 
     * Обновляет параметр в контроллере и синхронизирует состояние компонента
     * 
     * @param name - Название параметра
     * @param value - Новое значение (строка)
     */
    const handleParameterChange = (name: keyof Parameters, value: string) => {
        // Преобразуем строку в число для всех параметров кроме типа культуры
        const newValue = name === 'cropType' ? value : Number(value);
        
        // Обновляем параметр через контроллер
        controller.updateParameter(name, newValue);
        
        // Синхронизируем состояние компонента с моделью
        setParameters(controller.getParameters());
    };

    /**
     * Обработчик запуска симуляции
     * 
     * Запускает расчеты через контроллер и обновляет результат
     */
    const handleSimulate = () => {
        const r = controller.simulate();
        setResult(r);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Гидропонная экспертная система</h1>

            <div className="flex">
                <main className="flex-1 bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Тип растения</label>
                        <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                            value={selectedPlant}
                            onChange={(e) => setSelectedPlant(e.target.value)}
                        >
                            {plantOptions.map(plant => (
                                <option key={plant.value} value={plant.value}>
                                    {plant.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">pH</label>
                            <input type="number" step="0.1" value={parameters.ph}
                                onChange={e => handleParameterChange('ph', e.target.value)}
                                className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">EC (мСм/см)</label>
                            <input type="number" step="0.1" value={parameters.ec}
                                onChange={e => handleParameterChange('ec', e.target.value)}
                                className="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1">Температура воздуха (°C)</label>
                            <input type="number" value={parameters.airTemperature}
                                onChange={e => handleParameterChange('airTemperature', e.target.value)}
                                className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Температура раствора (°C)</label>
                            <input type="number" value={parameters.solutionTemperature}
                                onChange={e => handleParameterChange('solutionTemperature', e.target.value)}
                                className="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1">Интенсивность света (люкс)</label>
                            <input type="number" value={parameters.lightIntensity}
                                onChange={e => handleParameterChange('lightIntensity', e.target.value)}
                                className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Уровень CO2 (ppm)</label>
                            <input type="number" value={parameters.co2Level}
                                onChange={e => handleParameterChange('co2Level', e.target.value)}
                                className="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1">Влажность (%)</label>
                            <input type="number" value={parameters.humidity}
                                onChange={e => handleParameterChange('humidity', e.target.value)}
                                className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Уровень воды (%)</label>
                            <input type="number" value={parameters.waterLevel}
                                onChange={e => handleParameterChange('waterLevel', e.target.value)}
                                className="w-full border rounded px-3 py-2" />
                        </div>

                        <div className="col-span-2 flex justify-center mt-4">
                            <button onClick={handleSimulate}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Рассчитать результат
                            </button>
                        </div>
                    </div>

                    {result && (
                        <div className="mt-6 border-t pt-4">
                            <h2 className="text-xl font-bold mb-2">Результаты моделирования</h2>
                            <div className={`mb-2 ${result.isViable ? 'text-green-600' : 'text-red-600'}`}>
                                {result.isViable ? 'Растение будет развиваться нормально' : 'Растение может погибнуть'}
                            </div>
                            <div className="mb-1"><strong>Ожидаемая урожайность:</strong> {result.yieldPercentage}%</div>
                            <div className="mb-3"><strong>Время до сбора урожая:</strong> {result.growthTime} дней</div>

                            {result.issues.length > 0 && (
                                <div className="mb-3">
                                    <h3 className="font-semibold">Проблемы:</h3>
                                    <ul className="list-disc pl-5">
                                        {result.issues.map((it, i) => <li key={i} className="text-red-600">{it}</li>)}
                                    </ul>
                                </div>
                            )}

                            {result.recommendations.length > 0 && (
                                <div>
                                    <h3 className="font-semibold">Рекомендации:</h3>
                                    <ul className="list-disc pl-5">
                                        {result.recommendations.map((r, i) => <li key={i} className="text-blue-600">{r}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </main>

                <ParameterSidebar parameters={parameters} />
            </div>
        </div>
    );
};