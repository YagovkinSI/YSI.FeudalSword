import { ICurrentUser } from "../../models/ICurrentUser";
import { RootState } from "../Root";

interface SetState {
    type: 'SET_USER';
    user: ICurrentUser | undefined
}

interface SetBusy {
    type: 'SET_BUSY';
}

interface SetError {
    type: 'SET_ERROR';
    error: string
}

export type AuthorizationActions = SetState | SetBusy | SetError;

export const reducerAuthorization = (state : RootState, action : AuthorizationActions) 
: RootState | undefined => 
{
    switch (action.type) {  
        case 'SET_USER':
            return {
                ...state,
                authorization: {
                    ...state.authorization,
                    isChecked: true,
                    isBusy: false,
                    error: undefined,
                    user: action.user
                }
            }
        case 'SET_BUSY':
            return {
                ...state,
                authorization: {
                    ...state.authorization,
                    isBusy: true
                }
            }
        case 'SET_ERROR':
            return {
                ...state,
                authorization: {
                    ...state.authorization,
                    isChecked: true,
                    isBusy: false,
                    user: undefined,
                    error: action.error
                }
            }
        default:
            return undefined;             
    }
}