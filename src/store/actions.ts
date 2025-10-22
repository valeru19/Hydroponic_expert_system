// src/store/actions.ts

import { ADD_MEASUREMENT, AddMeasurementAction } from './types';
import { Measurement } from '../models/Measurement';

export const addMeasurement = (measurement: Measurement): AddMeasurementAction => {
    return {
        type: ADD_MEASUREMENT,
        payload: measurement
    };
};