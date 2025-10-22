import React from 'react';

interface RecommendationsProps {
    recommendations: string[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Рекомендации</h2>
            <ul className="list-disc pl-5">
                {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                ))}
            </ul>
        </div>
    );
};