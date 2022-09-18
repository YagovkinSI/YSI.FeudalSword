export enum enTurnState {
    InProgress = 0,
    InCalculation = 1,
    IsOver = 2
}

export interface CurrentTurnState {
    isChecked: boolean,
    isBusy: boolean,
    error: string | undefined,
    id: number,
    status: enTurnState
}

export const defaultCurrentTurnState : CurrentTurnState = {
    isChecked: false,
    isBusy: false,
    error: undefined,
    id: 0,
    status: enTurnState.InCalculation
}

