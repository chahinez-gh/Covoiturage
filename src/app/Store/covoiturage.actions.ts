import { Action } from '@ngrx/store';
import { Covoiturage } from 'src/Models/Covoiturage.model';

export const ADD_COVOITURAGE = "ADD_COVOITURAGE";
export const DELETE_COVOITURAGE = "DELETE_COVOITURAGE";
export const UPDATE_COVOITURAGE = "UPDATE_COVOITURAGE";
export const FILTER_COVOITURAGE = "FILTER_COVOITURAGE";
export const DEFAULT_COVOITURAGE = "DEFAULT_COVOITURAGE";

export class addCovoiturage implements Action {
    readonly type = ADD_COVOITURAGE;
    constructor(public payload: Covoiturage) { }
}

export class deleteCovoiturage implements Action {
    readonly type = DELETE_COVOITURAGE;
    constructor(public payload: number) { }
}

export class updateCovoiturage implements Action {
    readonly type = UPDATE_COVOITURAGE;
    constructor(public payload: { index: number, covoiturage: Covoiturage }) { }
}

export class filterCovoiturage implements Action {
    readonly type = FILTER_COVOITURAGE;
    constructor(public payload: { isDepart: boolean, filter: string }) { }
}

export class defaultCovoiturage implements Action {
    readonly type = DEFAULT_COVOITURAGE;
    constructor() { }
}

export type covoiturageActions = addCovoiturage | deleteCovoiturage | updateCovoiturage | filterCovoiturage | defaultCovoiturage;