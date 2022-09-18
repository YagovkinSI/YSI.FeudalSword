import { CurrentTurnState, defaultCurrentTurnState } from "./CurrentTurn/CurrentTurnState"

export interface PublicDataState {
    currentTurn: CurrentTurnState
}

export const defaultPublicDataState : PublicDataState = {
    currentTurn: defaultCurrentTurnState
}

