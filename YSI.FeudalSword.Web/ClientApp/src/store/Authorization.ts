import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import { ICurrentUser } from "../models/ICurrentUser";
import { ICheckAuthResponse } from "../models/ICheckAuthResponse";
import axios from "axios";
import GetErrorMessage from "../helpers/ServerErrorParserHepler";

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

interface ErrorGetCurrentUserAction {
    type: 'ERROR_GET_CURRENT_USER';
    error: string;
}

type KnownAction = RequestGetCurrentUserAction | ReceiveGetCurrentUserAction | ErrorGetCurrentUserAction;

const getCurrentUser = (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (!(appState && 
        (appState.authorization == undefined ||
        !appState.authorization.isLoading && 
        !appState.authorization.isChecked)))
        return;

    dispatch({ type: 'REQUEST_GET_CURRENT_USER' });
    console.log('User/currentUser');
    await axios.get('User/currentUser')
        .then(response => {
            console.log('response User/currentUser', response);
            dispatch({ 
                type: 'RECEIVE_GET_CURRENT_USER', 
                сheckCheckAuthResponse: response.data 
            })}
        )
        .catch(error => {
            console.log('error User/currentUser', error);
            dispatch({
                type: 'ERROR_GET_CURRENT_USER', 
                error: GetErrorMessage(error)
            })
        });
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
                error: '',
                isLoading: true
            };
        case 'RECEIVE_GET_CURRENT_USER':
            return {
                ...state, 
                isLoading: false,
                isChecked: true,
                error: '',
                user: action.сheckCheckAuthResponse.user
            };
        case 'ERROR_GET_CURRENT_USER':
            return {
                ...state,
                isLoading: false,
                isChecked: true,
                error: action.error
            }
    }
    
    return state;
};