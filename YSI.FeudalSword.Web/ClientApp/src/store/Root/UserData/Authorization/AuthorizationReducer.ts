import { Action } from "redux";
import { defaultUserDataState } from "..";
import { RootState } from "../..";
import { ICurrentUser } from "../../../../models/ICurrentUser";
import { AuthorizationState } from "./AuthorizationState";

interface SetUser {
    type: 'AUTHORIZATION/SET_USER';
    user: ICurrentUser | undefined
}

interface SetBusy {
    type: 'AUTHORIZATION/SET_BUSY';
}

interface SetError {
    type: 'AUTHORIZATION/SET_ERROR';
    error: string
}

export type AuthorizationActions = SetUser | SetBusy | SetError;

const setUser = (locaState : AuthorizationState, action : SetUser)
: AuthorizationState => {
    locaState = {
        ...locaState,
        isChecked: true,
        isBusy: false,
        error: undefined,
        user: action.user
    }
    return locaState;
}

const setBusy = (locaState : AuthorizationState, action : SetBusy)
: AuthorizationState => {
    locaState = {
        ...locaState,
        isBusy: true
    }
    return locaState;
}

const setError = (locaState : AuthorizationState, action : SetError)
: AuthorizationState => {
    locaState = {
        ...locaState,
        isChecked: true,
        isBusy: false,
        user: undefined,
        error: action.error
    }
    return locaState;
}

export const reducerAuthorization = (state : RootState, incomingAction : Action) 
: RootState | undefined => 
{
    const action = incomingAction as  AuthorizationActions;
    if (action == undefined)
        return undefined; 
    
    let newState = { ...state };
    let localState = newState.userData.authorization;
    switch (action.type) {  
        case 'AUTHORIZATION/SET_USER':         
            if (action.user == undefined) 
                newState.userData = defaultUserDataState;            
            newState.userData.authorization = setUser(localState, action);   
            return newState;
        case 'AUTHORIZATION/SET_BUSY':
            newState.userData.authorization = setBusy(localState, action);
            return newState;
        case 'AUTHORIZATION/SET_ERROR':
            newState.userData.authorization = setError(localState, action);
            return newState;
        default:
            return undefined;             
    }
}