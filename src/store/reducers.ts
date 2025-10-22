import { AnyAction } from 'redux';
import { Measurement } from '../models/Measurement';

interface State {
    measurements: Measurement[];
}

const initialState: State = {
    measurements: [],
};

const reducer = (state = initialState, action: AnyAction): State => {
    switch (action.type) {
        case 'ADD_MEASUREMENT':
            return {
                ...state,
                measurements: [...state.measurements, action.payload],
            };
        default:
            return state;
    }
};

export default reducer;