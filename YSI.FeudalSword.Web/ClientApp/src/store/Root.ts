import { Action, Reducer } from "redux";
import { AuthorizationActions, reducerAuthorization } from "./Authorization/AuthorizationReducer";
import { AuthorizationState, defaultAuthorizationState } from "./Authorization/AuthorizationState";

export interface RootState {
    authorization: AuthorizationState,
}

const defaultRootState: RootState = { 
    authorization: defaultAuthorizationState
};

export const reducer: Reducer<RootState> = (
    state: RootState = defaultRootState, 
    incomingAction: Action
): RootState => {

    let newState = reducerAuthorization(state, incomingAction as AuthorizationActions);
    if (newState != undefined)
        return newState;
    
    return state;
};