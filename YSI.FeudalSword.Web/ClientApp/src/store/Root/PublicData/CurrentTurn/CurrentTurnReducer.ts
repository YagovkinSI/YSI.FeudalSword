import { Action } from "redux";
import { RootState } from "../..";
import { ICurrentTurn } from "../../../../models/ICurrentTurn";

interface SetBusy {
    type: 'PUBLIC_DATA/CURRENT_TURN/SET_BUSY'
}

interface SetCurrentTurn {
    type: 'PUBLIC_DATA/CURRENT_TURN/SET_CURRENT_TURN',
    currentTurn: ICurrentTurn
}

interface SetError {
    type: 'PUBLIC_DATA/CURRENT_TURN/SET_ERROR',
    error: string
}

export type CurrentTurnActions = SetBusy | SetCurrentTurn | SetError;

export const reducerCurrentTurn = (state: RootState, incomingAction: Action )
: RootState | undefined => {
    const action = incomingAction as CurrentTurnActions;
    if (action == undefined)
        return undefined; 
    switch (action.type) {
        case "PUBLIC_DATA/CURRENT_TURN/SET_BUSY":
            return {
                ...state,
                publicData: {
                    ...state.publicData,
                    currentTurn: {
                        ...state.publicData.currentTurn,
                        isBusy: true,
                        error: undefined,
                        isChecked: true
                    }
                }
            }
        case "PUBLIC_DATA/CURRENT_TURN/SET_CURRENT_TURN":
            return {
                ...state,
                publicData: {
                    ...state.publicData,
                    currentTurn: {
                        ...state.publicData.currentTurn,
                        id: action.currentTurn.id,
                        isBusy: false,
                        error: undefined,
                        isChecked: true,
                        status: action.currentTurn.status
                    }
                }
            }
        case "PUBLIC_DATA/CURRENT_TURN/SET_ERROR":
            return {
                ...state,
                publicData: {
                    ...state.publicData,
                    currentTurn: {
                        ...state.publicData.currentTurn,
                        error: action.error,
                        isBusy: false,
                        isChecked: true
                    }
                }
            }
    }
}