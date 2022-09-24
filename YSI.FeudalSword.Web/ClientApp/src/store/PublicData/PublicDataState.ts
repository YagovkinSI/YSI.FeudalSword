import { IPublicArmy, IPublicUnit, IPublicDomain, IPublicUser, 
    IPublicTitle, IPublicCharacter, IPublicDynasty } from "../../models/IPublicDataApiModel"
import { CurrentTurnState, defaultCurrentTurnState } from "./CurrentTurn/CurrentTurnState"

export interface PublicDataState {
    currentTurn: CurrentTurnState,
    armies : IPublicArmy[],
    units : IPublicUnit[],
    domains : IPublicDomain[],
    users: IPublicUser[],
    titles : IPublicTitle[],
    characters : IPublicCharacter[],
    dynasties : IPublicDynasty[]
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
}

