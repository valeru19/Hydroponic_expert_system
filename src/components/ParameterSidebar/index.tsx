import React from 'react';
import { Parameters } from '../../models/Parameters';

interface SidebarProps {
    parameters: Parameters;
}

const explanations: { key: keyof Parameters; label: string; text: string }[] = [
    { key: 'ph', label: 'pH', text: 'Влияет на доступность макро- и микроэлементов. Оптимум предотвращает хлороз и токсичность элементов.' },
    { key: 'ec', label: 'EC', text: 'Показатель солёности раствора. Слишком высокий — осмотический стресс, низкий — нехватка питательных веществ.' },
    { key: 'airTemperature', label: 'Темп. воздуха (°C)', text: 'Температура воздуха регулирует метаболизм и скорость роста; экстремумы тормозят развитие или вызывают гибель.' },
    { key: 'solutionTemperature', label: 'Темп. раствора (°C)', text: 'Влияет на корневой метаболизм и растворимость O2 в растворе; слишком высокая — корневые болезни.' },
    { key: 'lightIntensity', label: 'Освещённость (люкс)', text: 'Определяет скорость фотосинтеза. Недостаток — слабый рост, переизбыток может вызвать стресс у некоторых культур.' },
    { key: 'co2Level', label: 'CO2 (ppm)', text: 'Уровень CO2 лимитирует фотосинтез при достаточном свете; повышение часто повышает урожайность.' },
    { key: 'humidity', label: 'Влажность (%)', text: 'Влияет на транспирацию и риск болезней; высокая влажность повышает риск грибков, низкая — стресс и увядание.' },
    { key: 'waterLevel', label: 'Уровень воды (%)', text: 'Отражает доступность воды/питания для корней; слишком высокий/низкий приводит к стрессу.' },
    { key: 'oxygenLevel', label: 'Кислород (mg/L)', text: 'Критичен для корневого дыхания; дефицит вызывает корневой коллапс и заболевания.' },
];

const ParameterSidebar: React.FC<SidebarProps> = ({ parameters }) => {
    return (
        <aside className="w-80 ml-6 sticky top-6">
            <div className="bg-white border rounded p-4 shadow-sm">
                <h3 className="font-bold text-lg mb-3">Текущие параметры</h3>
                <ul className="mb-4">
                    {explanations.map(e => (
                        <li key={e.key} className="mb-2">
                            <div className="text-sm text-gray-600">{e.label}</div>
                            <div className="text-md font-medium">{String(parameters[e.key])}</div>
                        </li>
                    ))}
                </ul>

                <h4 className="font-semibold mb-2">Пояснения / влияние</h4>
                <div className="text-sm text-gray-700 space-y-3">
                    {explanations.map(e => (
                        <div key={e.key}>
                            <div className="font-medium">{e.label}</div>
                            <div className="text-xs text-gray-600">{e.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ParameterSidebar;