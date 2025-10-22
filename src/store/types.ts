import { Measurement } from '../models/Measurement';
import { Parameters } from '../models/Parameters';

export const ADD_MEASUREMENT = 'ADD_MEASUREMENT';
export const SET_PARAMETERS = 'SET_PARAMETERS';

export interface AddMeasurementAction {
    type: typeof ADD_MEASUREMENT;
    payload: Measurement;
}

export interface SetParametersAction {
    type: typeof SET_PARAMETERS;
    payload: Parameters;
}

export type ActionTypes = AddMeasurementAction | SetParametersAction;

export interface State {
    measurements: Measurement[];
    parameters: Parameters | null;
}