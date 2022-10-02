import { Action, Reducer } from "redux";
import { publicDataReducers } from "./PublicData/PublicDataReducer";
import { defaultPublicDataState, PublicDataState } from "./PublicData/PublicDataState";
import { uiReducers } from "./UserData/UI/UiReducer";
import { defaultUserDataState, UserDataState } from "./UserData/UserDataState";
import { userDataReducers } from "./UserData/UserDataReducer";

export interface RootState {   
    userData: UserDataState, 
    publicData: PublicDataState
}

const defaultRootState: RootState = {
    userData: defaultUserDataState,
    publicData: defaultPublicDataState
};

export const reducer: Reducer<RootState> = (
    state: RootState = defaultRootState,
    action: Action
): RootState => {
    let newState : RootState | undefined = undefined;
    reducers.forEach(currentReducer  => {
        if (newState != undefined)
            return newState;        
        newState = currentReducer(state, action);
    });
    if (newState != undefined)
        return newState;
    return state;
};

const reducers = [
    ...publicDataReducers, 
    ...userDataReducers
]