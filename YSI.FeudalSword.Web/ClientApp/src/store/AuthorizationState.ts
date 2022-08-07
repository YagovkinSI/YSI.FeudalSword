import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import { ICurrentUser } from "../models/ICurrentUser";

export interface AuthorizationState {
    isLoading: boolean;
    isChecked: boolean;
    user: ICurrentUser;
    error: string;
}

const unloadedState: AuthorizationState = { 
    error: '',
    isLoading: false,
    user: {} as ICurrentUser,
    isChecked: false
};

export const reducer: Reducer<AuthorizationState> = (
    state: AuthorizationState | undefined, 
    incomingAction: Action
): AuthorizationState => {
    if (state === undefined) {
        return unloadedState;
    }
    
    return state;
};