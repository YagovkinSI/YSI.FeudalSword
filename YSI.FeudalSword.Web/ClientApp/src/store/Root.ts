import { Action, Reducer } from "redux";
import { AuthorizationActions, reducerAuthorization } from "./UserData/Authorization/AuthorizationReducer";
import { AuthorizationState, defaultAuthorizationState } from "./UserData/Authorization/AuthorizationState";
import { reducerPublicData } from "./PublicData/PublicDataReducer";
import { defaultPublicDataState, PublicDataState } from "./PublicData/PublicDataState";
import { reducerUi } from "./UI/UiReducer";
import { UiState, defaultUiState } from "./UI/UiState";
import { reducerUserData } from "./UserData/UserDataReducer";
import { defaultUserDataState, UserDataState } from "./UserData/UserDataState";

export interface RootState {   
    userData: UserDataState, 
    publicData: PublicDataState,
    ui: UiState
}

const defaultRootState: RootState = {
    userData: defaultUserDataState,
    publicData: defaultPublicDataState,
    ui: defaultUiState
};

export const reducer: Reducer<RootState> = (
    state: RootState = defaultRootState,
    incomingAction: Action
): RootState => {

    let newState = reducerUi(state, incomingAction);
    if (newState != undefined)
        return newState;

    newState = reducerPublicData(state, incomingAction);
    if (newState != undefined)
        return newState;

    newState = reducerUserData(state, incomingAction);
    if (newState != undefined)
        return newState;

    return state;
};
