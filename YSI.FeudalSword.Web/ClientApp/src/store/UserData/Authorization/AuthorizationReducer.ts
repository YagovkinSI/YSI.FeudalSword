import { ICurrentUser } from "../../../models/ICurrentUser";
import { RootState } from "../../Root";
import { defaultUserDataState } from "../UserDataState";

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

export const reducerAuthorization = (state : RootState, action : AuthorizationActions) 
: RootState | undefined => 
{
    switch (action.type) {  
        case 'AUTHORIZATION/SET_USER':
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
        case 'AUTHORIZATION/SET_BUSY':
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
        case 'AUTHORIZATION/SET_ERROR':
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
        default:
            return undefined;             
    }
}