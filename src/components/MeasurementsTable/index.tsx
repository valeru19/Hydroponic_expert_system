import React from 'react';
import { Measurement } from '../../models/Measurement';

interface MeasurementsTableProps {
    measurements: Measurement[];
}

export const MeasurementsTable: React.FC<MeasurementsTableProps> = ({ measurements }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th>Дата/Время</th>
                        <th>Культура</th>
                        <th>pH</th>
                        <th>EC</th>
                        <th>Air Temp</th>
                        <th>Solution Temp</th>
                        <th>Light</th>
                        <th>CO2</th>
                        <th>Humidity</th>
                        <th>Water Level</th>
                        <th>Oxygen</th>
                        <th>Recommendations</th>
                    </tr>
                </thead>
                <tbody>
                    {measurements.map((m) => (
                        <tr key={m.id}>
                            <td>{m.timestamp}</td>
                            <td>{m.cropType}</td>
                            <td>{m.ph}</td>
                            <td>{m.ec}</td>
                            <td>{'m.air_temp'}</td>
                            <td>{'m.solution_temp'}</td>
                            <td>{'m.light'}</td>
                            <td>{'m.co2'}</td>
                            <td>{'m.humidity'}</td>
                            <td>{'m.water_level'}</td>
                            <td>{'m.oxygen'}</td>
                            <td>{m.recommendations}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};