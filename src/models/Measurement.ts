/*
hydroponics-expert-system
├── src
│   ├── components
│   │   ├── Dashboard
│   │   │   └── index.tsx
│   │   ├── MeasurementsTable
│   │   │   └── index.tsx
│   │   ├── ParametersForm
│   │   │   └── index.tsx
│   │   └── Recommendations
│   │       └── index.tsx
│   ├── models
│   │   ├── Measurement.ts
│   │   └── Parameters.ts
│   ├── services
│   │   └── expertSystem.ts
│   ├── store
│   │   ├── actions.ts
│   │   ├── reducers.ts
│   │   └── types.ts
│   ├── utils
│   │   └── calculations.ts
│   ├── App.tsx
│   └── index.tsx
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md */

export interface Measurement {
    id: string;
    timestamp: string;
    cropType: string;
    ph: number;
    ec: number;
    airTemperature: number;
    solutionTemperature: number;
    lightIntensity: number;
    co2Level: number;
    humidity: number;
    waterLevel: number;
    oxygenLevel: number;
    recommendations: string[]; // Обязательное поле
}