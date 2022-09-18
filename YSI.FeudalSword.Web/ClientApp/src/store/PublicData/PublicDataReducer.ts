import { Action } from "redux";
import { RootState } from "../Root"
import { CurrentTurnActions, reducerCurrentTurn } from "./CurrentTurn/CurrentTurnReducer";

export const reducerPublicData = (state: RootState, action: Action )
: RootState | undefined => {

    let newState = reducerCurrentTurn(state, action as CurrentTurnActions);
    if (newState != undefined)
        return newState;
        
}