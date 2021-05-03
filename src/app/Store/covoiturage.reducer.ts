import { Covoiturage } from "../../Models/Covoiturage.model";
import * as CovoiturageActions from './covoiturage.actions';

const initialState = {
    covoiturages: [
        new Covoiturage('Constantine', 'Oran', new Date("2021/04/29"), '207'),
        new Covoiturage('Constantine', 'Alger', new Date("2021/04/06"), 'BMW')
    ]
}

export function covoiturageReducer(state = initialState, action: CovoiturageActions.covoiturageActions) {
    switch (action.type) {
        case CovoiturageActions.ADD_COVOITURAGE:
            return {
                ...state, // 3 point pour faire une copie de state objet
                covoiturages: [...state.covoiturages, action.payload]
            };
        case CovoiturageActions.UPDATE_COVOITURAGE:
            const covoiturage = state.covoiturages[action.payload.index];
            const updatedCovoiturage = {
                ...covoiturage,
                ...action.payload.covoiturage
            };
            const updatedCovoiturages = [...state.covoiturages];
            updatedCovoiturages[action.payload.index] = updatedCovoiturage;
            return {
                ...state,
                covoiturages: updatedCovoiturages
            };
        case CovoiturageActions.DELETE_COVOITURAGE:
            return {
                ...state,
                covoiturages: state.covoiturages.filter((co, coIndex) => {
                    return coIndex != action.payload;
                })
            };
        case CovoiturageActions.FILTER_COVOITURAGE:
            const filtredCovoiturages = [...state.covoiturages];
            return {
                ...state,
                covoiturages: filtredCovoiturages.filter((co) => {
                    if (action.payload.isDepart) {
                        return co.villeDepart.toLowerCase().includes(action.payload.filter.toLowerCase());
                    } else {
                        return co.villeArrive.toLowerCase().includes(action.payload.filter.toLowerCase());
                    }
                })
            };
        case CovoiturageActions.DEFAULT_COVOITURAGE:
            return initialState;
        default:
            console.log('default : ', state);
            return state;
    }
}