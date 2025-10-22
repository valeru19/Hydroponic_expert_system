/**
 * Компонент отображения результатов симуляции
 * 
 * Отображает результаты работы экспертной системы:
 * - Статус жизнеспособности растения
 * - Прогноз урожайности
 * - Время роста
 * - Выявленные проблемы
 * - Рекомендации по оптимизации
 */

import React from 'react';
import { SimulationResult } from '../../models/SimulationResult';

/**
 * Пропсы компонента результатов симуляции
 */
interface SimulationResultsProps {
    /** Результат симуляции для отображения */
    result: SimulationResult;
    /** Тип культуры для заголовка */
    cropType: string;
}

/**
 * Компонент отображения результатов симуляции роста растений
 * 
 * Предоставляет детальную информацию о прогнозе выращивания,
 * включая жизнеспособность, урожайность и рекомендации.
 */
const SimulationResults: React.FC<SimulationResultsProps> = ({ result, cropType }) => {
    /**
     * Определение цвета статуса в зависимости от жизнеспособности
     * 
     * @param isViable - Жизнеспособность растения
     * @returns CSS класс для цвета текста
     */
    const getStatusColor = (isViable: boolean) => 
        isViable ? 'text-green-600' : 'text-red-600';

    return (
        <div className="border rounded p-4 mt-4">
            <h2 className="text-xl font-bold mb-4">Результаты моделирования для {cropType}</h2>
            
            <div className={`text-lg font-bold ${getStatusColor(result.isViable)}`}>
                {result.isViable 
                    ? 'Растение будет жизнеспособно' 
                    : 'Растение погибнет'}
            </div>

            <div className="mt-2">
                <span className="font-bold">Ожидаемая урожайность:</span> {result.yieldPercentage}% от максимальной
            </div>
            {result.expectedGrams !== undefined && (
                <div className="mt-2">
                    <span className="font-bold">Ожидаемый урожай:</span> {result.expectedGrams} г
                </div>
            )}
            {result.yieldPerSquareMeter !== undefined && (
                <div className="mt-2">
                    <span className="font-bold">Урожайность:</span> {result.yieldPerSquareMeter} кг/м²
                </div>
            )}
            {result.isViable && (
                <div className="mt-2">
                    <span className="font-bold">Время до сбора урожая:</span> {result.growthTime} дней
                </div>
            )}

            {result.issues.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-bold mb-2">Выявленные проблемы:</h3>
                    <ul className="list-disc pl-5">
                        {result.issues.map((issue, index) => (
                            <li key={index} className="text-red-600">{issue}</li>
                        ))}
                    </ul>
                </div>
            )}

            {result.recommendations.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-bold mb-2">Рекомендации:</h3>
                    <ul className="list-disc pl-5">
                        {result.recommendations.map((rec, index) => (
                            <li key={index} className="text-blue-600">{rec}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SimulationResults;