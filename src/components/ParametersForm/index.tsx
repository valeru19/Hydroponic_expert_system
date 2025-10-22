import React, { useState } from 'react';
import { Parameters } from '../../models/Parameters';

interface ParametersFormProps {
    onSubmit: (parameters: Parameters) => void;
}

const ParametersForm: React.FC<ParametersFormProps> = ({ onSubmit }) => {
    const [parameters, setParameters] = useState<Parameters>({
        cropType: 'lettuce',
        ph: 6.0,
        ec: 1.5,
        airTemperature: 20,
        solutionTemperature: 20,
        lightIntensity: 12000,
        co2Level: 800,
        humidity: 60,
        waterLevel: 100,
        oxygenLevel: 6
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(parameters);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setParameters(prev => ({
            ...prev,
            [name]: name === 'cropType' ? value : Number(value)
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
                <label className="block mb-1">Культура:</label>
                <select
                    name="cropType"
                    value={parameters.cropType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="lettuce">Салат</option>
                    <option value="tomatoes">Томаты</option>
                    <option value="basil">Базилик</option>
                </select>
            </div>

            <div>
                <label className="block mb-1">pH:</label>
                <input
                    type="number"
                    name="ph"
                    value={parameters.ph}
                    onChange={handleChange}
                    step="0.1"
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Добавьте остальные поля ввода по аналогии */}

            <button
                type="submit"
                className="col-span-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Получить рекомендации
            </button>
        </form>
    );
};

export default ParametersForm;