export type Crop = {
    id: string;
    commonName: string;
    scientificName?: string;
    category: 'leafy' | 'herb' | 'fruit' | 'microgreen' | 'sprout' | 'root' | 'other';
    growthDaysRange: [number, number];
    optimalTempC: [number, number];
    optimalPH: [number, number];
    lightLux?: number;
    notes?: string;
};

export const CROPS: Crop[] = [
    { id: 'lettuce', commonName: 'Салат', scientificName: 'Lactuca sativa', category: 'leafy', growthDaysRange: [28, 45], optimalTempC: [15, 22], optimalPH: [5.5, 6.5], lightLux: 20000 },
    { id: 'basil', commonName: 'Базилик', scientificName: 'Ocimum basilicum', category: 'herb', growthDaysRange: [25, 60], optimalTempC: [18, 30], optimalPH: [5.5, 6.5], lightLux: 20000 },
    { id: 'tomato', commonName: 'Томат', scientificName: 'Solanum lycopersicum', category: 'fruit', growthDaysRange: [60, 100], optimalTempC: [18, 26], optimalPH: [5.5, 6.5], lightLux: 30000 },

    // Добавленные культуры
    { id: 'spinach', commonName: 'Шпинат', scientificName: 'Spinacia oleracea', category: 'leafy', growthDaysRange: [30, 50], optimalTempC: [10, 20], optimalPH: [6.0, 7.0], lightLux: 15000 },
    { id: 'arugula', commonName: 'Руккола', scientificName: 'Eruca sativa', category: 'leafy', growthDaysRange: [20, 35], optimalTempC: [10, 20], optimalPH: [6.0, 7.0], lightLux: 15000 },
    { id: 'kale', commonName: 'Кейл', scientificName: 'Brassica oleracea var. sabellica', category: 'leafy', growthDaysRange: [45, 75], optimalTempC: [10, 24], optimalPH: [6.0, 7.0], lightLux: 18000 },
    { id: 'chard', commonName: 'Мангольд', scientificName: 'Beta vulgaris var. cicla', category: 'leafy', growthDaysRange: [30, 60], optimalTempC: [15, 24], optimalPH: [6.0, 7.0], lightLux: 16000 },
    { id: 'pak_choi', commonName: 'Пак Чой', scientificName: 'Brassica rapa subsp. chinensis', category: 'leafy', growthDaysRange: [30, 45], optimalTempC: [15, 22], optimalPH: [6.0, 7.0], lightLux: 15000 },

    { id: 'microgreens_mix', commonName: 'Микрозелень (микс)', category: 'microgreen', growthDaysRange: [7, 14], optimalTempC: [18, 24], optimalPH: [5.5, 7.0], lightLux: 10000, notes: 'скороспелая; разные культуры в одном лотке' },
    { id: 'pea_shoots', commonName: 'Ростки гороха', scientificName: 'Pisum sativum', category: 'microgreen', growthDaysRange: [7, 14], optimalTempC: [15, 22], optimalPH: [6.0, 7.0], lightLux: 10000 },
    { id: 'watercress', commonName: 'Водяная кресс-салат (Watercress)', scientificName: 'Nasturtium officinale', category: 'leafy', growthDaysRange: [14, 28], optimalTempC: [10, 20], optimalPH: [6.5, 7.5], lightLux: 12000 },

    { id: 'cilantro', commonName: 'Кинза', scientificName: 'Coriandrum sativum', category: 'herb', growthDaysRange: [28, 70], optimalTempC: [15, 25], optimalPH: [6.0, 7.0], lightLux: 15000 },
    { id: 'parsley', commonName: 'Петрушка', scientificName: 'Petroselinum crispum', category: 'herb', growthDaysRange: [50, 90], optimalTempC: [12, 24], optimalPH: [6.0, 7.0], lightLux: 12000 },
    { id: 'mint', commonName: 'Мята', scientificName: 'Mentha', category: 'herb', growthDaysRange: [30, 60], optimalTempC: [15, 24], optimalPH: [6.0, 7.0], lightLux: 12000 },
    { id: 'chives', commonName: 'Шнитт-лук', scientificName: 'Allium schoenoprasum', category: 'herb', growthDaysRange: [30, 60], optimalTempC: [10, 22], optimalPH: [6.0, 7.0], lightLux: 12000 },
    { id: 'rosemary', commonName: 'Розмарин', scientificName: 'Salvia rosmarinus', category: 'herb', growthDaysRange: [60, 120], optimalTempC: [15, 25], optimalPH: [6.0, 7.0], lightLux: 15000, notes: 'медленнорастущий; любит хорошее освещение' },
    { id: 'thyme', commonName: 'Тимьян', scientificName: 'Thymus vulgaris', category: 'herb', growthDaysRange: [60, 120], optimalTempC: [15, 24], optimalPH: [6.0, 7.0], lightLux: 15000 },
    { id: 'oregano', commonName: 'Орегано', scientificName: 'Origanum vulgare', category: 'herb', growthDaysRange: [60, 120], optimalTempC: [15, 24], optimalPH: [6.0, 7.0], lightLux: 15000 },

    { id: 'cucumber', commonName: 'Огурец', scientificName: 'Cucumis sativus', category: 'fruit', growthDaysRange: [50, 70], optimalTempC: [20, 26], optimalPH: [5.5, 6.5], lightLux: 25000 },
    { id: 'pepper', commonName: 'Перец', scientificName: 'Capsicum annuum', category: 'fruit', growthDaysRange: [60, 90], optimalTempC: [20, 28], optimalPH: [5.5, 6.5], lightLux: 25000 },
    { id: 'strawberry', commonName: 'Клубника', scientificName: 'Fragaria × ananassa', category: 'fruit', growthDaysRange: [60, 120], optimalTempC: [15, 25], optimalPH: [5.5, 6.5], lightLux: 20000 },
    { id: 'eggplant', commonName: 'Баклажан', scientificName: 'Solanum melongena', category: 'fruit', growthDaysRange: [80, 140], optimalTempC: [20, 30], optimalPH: [5.5, 6.5], lightLux: 25000 }
];