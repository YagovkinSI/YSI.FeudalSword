import { Action } from "redux";
import { RootState } from "../Root"
import { reducerUserCharacter, UserCharacterActions } from "./Character/UserCharacterReducer";

export const reducerUserData = (state: RootState, action: Action )
: RootState | undefined => {

    let newState = reducerUserCharacter(state, action as UserCharacterActions);
    if (newState != undefined)
        return newState;

    return undefined;

        
}