import { Action, Reducer } from "redux";
import { AuthorizationActions, reducerAuthorization } from "./Authorization/AuthorizationReducer";
import { AuthorizationState, defaultAuthorizationState } from "./Authorization/AuthorizationState";
import { reducerPublicData } from "./PublicData/PublicDataReducer";
import { defaultPublicDataState, PublicDataState } from "./PublicData/PublicDataState";
import { reducerUi } from "./UI/UiReducer";
import { UiState, defaultUiState } from "./UI/UiState";

export interface RootState {
    authorization: AuthorizationState,
    publicData: PublicDataState,
    ui: UiState
}

const defaultRootState: RootState = { 
    authorization: defaultAuthorizationState,
    publicData: defaultPublicDataState,
    ui: defaultUiState
};

export const reducer: Reducer<RootState> = (
    state: RootState = defaultRootState, 
    incomingAction: Action
): RootState => {

    let newState = reducerAuthorization(state, incomingAction as AuthorizationActions);
    if (newState != undefined)
        return newState;

    newState = reducerUi(state, incomingAction);
    if (newState != undefined)
        return newState; 

    newState = reducerPublicData(state, incomingAction);
    if (newState != undefined)
        return newState; 
        
    return state;
};