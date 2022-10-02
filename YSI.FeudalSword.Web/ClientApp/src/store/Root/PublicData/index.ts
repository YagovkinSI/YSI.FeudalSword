import { IPublicArmy, IPublicUnit, IPublicDomain, IPublicUser, 
    IPublicTitle, IPublicCharacter, IPublicDynasty } from "../../../models/IPublicDataApiModel"
import { reducerCurrentTurn } from "./CurrentTurn/CurrentTurnReducer"
import { CurrentTurnState, defaultCurrentTurnState } from "./CurrentTurn/CurrentTurnState"
import { reducerPublicData } from "./Base/PublicDataReducer"

export interface PublicDataState {
    currentTurn: CurrentTurnState,
    armies : IPublicArmy[],
    units : IPublicUnit[],
    domains : IPublicDomain[],
    users: IPublicUser[],
    titles : IPublicTitle[],
    characters : IPublicCharacter[],
    dynasties : IPublicDynasty[],

    loadings: string[]
}

export const defaultPublicDataState : PublicDataState = {
    currentTurn: defaultCurrentTurnState,
    armies : [],
    units : [],
    domains : [],
    users: [],
    titles : [],
    characters : [],
    dynasties : [],

    loadings: []
}

export const publicDataReducers = [
    reducerCurrentTurn,
    reducerPublicData
]

