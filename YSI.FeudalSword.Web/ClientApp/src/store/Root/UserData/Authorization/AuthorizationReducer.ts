import { Action } from "redux";
import { defaultUserDataState } from "..";
import { RootState } from "../..";
import { ICurrentUser } from "../../../../models/ICurrentUser";

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

const setUser = (state : RootState, action : SetUser)
: RootState => {
    if (action.user == undefined)
        state.userData = defaultUserDataState;
    return {
        ...state,
        userData: {
            ...state.userData,
            authorization: {
                ...state.userData.authorization,
                isChecked: true,
                isBusy: false,
                error: undefined,
                user: action.user
            }
        }
    }
}

const setBusy = (state : RootState, action : SetBusy)
: RootState => {
    return {
        ...state,
        userData: {
            ...state.userData,
            authorization: {
                ...state.userData.authorization,
                isBusy: true
            }                    
        }                    
    }
}

const setError = (state : RootState, action : SetError)
: RootState => {
    return {
        ...state,
        userData: {
            ...state.userData,
            authorization: {
                ...state.userData.authorization,
                isChecked: true,
                isBusy: false,
                user: undefined,
                error: action.error
            }                    
        } 
    }
}

export const reducerAuthorization = (state : RootState, incomingAction : Action) 
: RootState | undefined => 
{
    const action = incomingAction as  AuthorizationActions;
    if (action == undefined)
        return undefined; 
    switch (action.type) {  
        case 'AUTHORIZATION/SET_USER':
            return setUser(state, action);
        case 'AUTHORIZATION/SET_BUSY':
            return setBusy(state, action);
        case 'AUTHORIZATION/SET_ERROR':
            return setError(state, action);
        default:
            return undefined;             
    }
}