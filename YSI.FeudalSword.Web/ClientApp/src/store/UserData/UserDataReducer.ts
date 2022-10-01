import { Action } from "redux";
import { RootState } from "../Root"
import { AuthorizationActions, reducerAuthorization } from "./Authorization/AuthorizationReducer";
import { reducerUserCharacter, UserCharacterActions } from "./Character/UserCharacterReducer";

export const reducerUserData = (state: RootState, action: Action )
: RootState | undefined => {

    let newState = reducerAuthorization(state, action as AuthorizationActions);
    if (newState != undefined)
        return newState;

    newState = reducerUserCharacter(state, action as UserCharacterActions);
    if (newState != undefined)
        return newState;

    return undefined;

        
}