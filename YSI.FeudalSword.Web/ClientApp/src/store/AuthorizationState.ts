import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import { ICurrentUser } from "../models/ICurrentUser";
import { ICheckAuthResponse } from "../models/ICheckAuthResponse";

export interface AuthorizationState {
    isLoading: boolean;
    isChecked: boolean;
    user: ICurrentUser | undefined;
    error: string;
}

const unloadedState: AuthorizationState = { 
    error: '',
    isLoading: false,
    user: {} as ICurrentUser,
    isChecked: false
};

interface RequestGetCurrentUserAction {
    type: 'REQUEST_GET_CURRENT_USER';
}

interface ReceiveGetCurrentUserAction {
    type: 'RECEIVE_GET_CURRENT_USER';
    сheckCheckAuthResponse: ICheckAuthResponse;
}

type KnownAction = RequestGetCurrentUserAction | ReceiveGetCurrentUserAction;

const getCurrentUser = (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState && 
        (appState.authorization == undefined ||
        !appState.authorization.isLoading && 
        !appState.authorization.isChecked)) {
        fetch(`User/currentUser`)
            .then(response => response.json() as Promise<ICheckAuthResponse>)
            .then(data => {
                dispatch({ type: 'RECEIVE_GET_CURRENT_USER', сheckCheckAuthResponse: data });
            });

        dispatch({ type: 'REQUEST_GET_CURRENT_USER' });
    }
}

export const actionCreators = { getCurrentUser };

export const reducer: Reducer<AuthorizationState> = (
    state: AuthorizationState | undefined, 
    incomingAction: Action
): AuthorizationState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_GET_CURRENT_USER':
            return {
                ...state, 
                isLoading: true
            };
        case 'RECEIVE_GET_CURRENT_USER':
            return {
                ...state, 
                isLoading: false,
                isChecked: true,
                user: action.сheckCheckAuthResponse.user
            };
            break;
    }
    
    return state;
};