import React, { useState } from 'react';
import ParametersForm from '../ParametersForm';
import { MeasurementsTable } from '../MeasurementsTable';
import { Recommendations } from '../Recommendations';
import { Parameters } from '../../models/Parameters';
import { Measurement } from '../../models/Measurement';
import { SimulationService } from '../../services/simulationService';

const Dashboard: React.FC = () => {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const simulationService = new SimulationService();

    const handleSubmit = (parameters: Parameters) => {
        // Получаем результаты моделирования
        const simulationResult = simulationService.simulateGrowth(parameters);

        // Создаем новое измерение с рекомендациями
        const newMeasurement: Measurement = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...parameters,
            recommendations: simulationResult.recommendations // Добавляем рекомендации
        };

        // Обновляем состояние
        setMeasurements([...measurements, newMeasurement]);
        setRecommendations(simulationResult.recommendations);

        // Сохраняем в JSON Server
        saveToServer(newMeasurement);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Гидропонная экспертная система</h1>
            
            {/* Форма ввода параметров */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Ввод параметров</h2>
                <ParametersForm onSubmit={handleSubmit} />
            </div>

            {/* Текущие рекомендации */}
            <div className="mb-8">
                <Recommendations recommendations={recommendations} />
            </div>

            {/* История измерений */}
            <div>
                <h2 className="text-xl font-bold mb-2">История измерений</h2>
                <MeasurementsTable measurements={measurements} />
            </div>
        </div>
    );
};

// Функция сохранения в JSON Server
const saveToServer = async (measurement: Measurement) => {
    try {
        const response = await fetch('http://localhost:3000/measurements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(measurement),
        });
        
        if (!response.ok) {
            throw new Error('Ошибка сохранения данных');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось сохранить измерение');
    }
};

export default Dashboard;