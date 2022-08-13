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
    user: undefined,
    isChecked: false
};

interface LoadingAction {
    type: 'LOADING_ACTION';
}

interface ReceiveCurrentUserAction {
    type: 'RECEIVE_CURRENT_USER_ACTION';
    user: ICurrentUser | undefined;
}

interface ReceiveErrorAction {
    type: 'RECEIVE_ERROR_ACTION';
    error: string;
}

type KnownAction = LoadingAction | ReceiveCurrentUserAction | ReceiveErrorAction;

const getCurrentUser = (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (!appState || 
        appState.authorization == undefined ||
        appState.authorization.isLoading || 
        appState.authorization.isChecked)
        return;

    dispatch({ type: 'LOADING_ACTION' });
    console.log('User/currentUser');
    await axios.get('User/currentUser')
        .then(response => {
            console.log('response User/currentUser', response);
            dispatch({ 
                type: 'RECEIVE_CURRENT_USER_ACTION', 
                user: response.data.user 
            })}
        )
        .catch(error => {
            console.log('error User/currentUser', error);
            dispatch({
                type: 'RECEIVE_ERROR_ACTION', 
                error: GetErrorMessage(error)
            })
        });
}

const register = (userName: string, password: string, passwordConfirm: string)
: AppThunkAction<KnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (!appState || 
        appState.authorization == undefined ||
        appState.authorization.isLoading)
        return;

    dispatch({ type: 'LOADING_ACTION' });
    console.log('User/register');
    await axios.post('User/register', { userName, password, passwordConfirm })
        .then(response => {
            console.log('response User/register', response);
            dispatch({ 
                type: 'RECEIVE_CURRENT_USER_ACTION', 
                user: response.data 
            })}
        )
        .catch(error => {
            console.log('error User/register', error);
            dispatch({
                type: 'RECEIVE_ERROR_ACTION', 
                error: GetErrorMessage(error)
            })
        });
}

export const actionCreators = { getCurrentUser, register };

export const reducer: Reducer<AuthorizationState> = (
    state: AuthorizationState | undefined, 
    incomingAction: Action
): AuthorizationState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOADING_ACTION':
            return {
                ...state, 
                error: '',
                isLoading: true
            };
        case 'RECEIVE_CURRENT_USER_ACTION':
            return {
                ...state, 
                isLoading: false,
                isChecked: true,
                error: '',
                user: action.user
            };
        case 'RECEIVE_ERROR_ACTION':
            return {
                ...state,
                isLoading: false,
                isChecked: true,
                error: action.error
            }
    }
    
    return state;
};