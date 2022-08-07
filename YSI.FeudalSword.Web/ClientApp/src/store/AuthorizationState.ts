import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import { ICurrentUser } from "../models/ICurrentUser";
import { ICheckAuthResponse } from "../models/ICheckAuthResponse";
import axios from "axios";

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

const getCurrentUser = (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (!(appState && 
        (appState.authorization == undefined ||
        !appState.authorization.isLoading && 
        !appState.authorization.isChecked)))
        return;

    dispatch({ type: 'REQUEST_GET_CURRENT_USER' });
    await axios.get('User/currentUser')
        .then(response => 
            dispatch({ 
                type: 'RECEIVE_GET_CURRENT_USER', 
                сheckCheckAuthResponse: response.data 
            })
        );
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