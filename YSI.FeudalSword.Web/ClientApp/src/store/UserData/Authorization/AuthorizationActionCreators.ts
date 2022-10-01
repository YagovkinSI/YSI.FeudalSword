import { AppThunkAction } from "../..";
import { requestService } from "../../RequestService/RequestService";
import { AuthorizationActions } from "./AuthorizationReducer";

const getCurrentUser = ()
: AppThunkAction<AuthorizationActions> => async (dispatch, getState) => {
    const appState = getState();
    if (appState.root.userData.authorization.isBusy)
        return;
    dispatch({ type: 'AUTHORIZATION/SET_BUSY' })
    const response = await requestService.userController.getCurrentUser(appState);
    if (response.success) {
        const user = response.data == undefined ? undefined : response.data.user;
        dispatch({ type: 'AUTHORIZATION/SET_USER', user });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'AUTHORIZATION/SET_ERROR', error });
    }
}

const register = (userName: string, password: string, passwordConfirm: string)
: AppThunkAction<AuthorizationActions> => async (dispatch, getState) => {
    const appState = getState();
    if (appState.root.userData.authorization.isBusy)
        return;
    dispatch({ type: 'AUTHORIZATION/SET_BUSY' })
    const response = await requestService.userController.register(appState, userName, password, passwordConfirm);
    if (response.success) {
        const user = response.data;
        dispatch({ type: 'AUTHORIZATION/SET_USER', user });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'AUTHORIZATION/SET_ERROR', error });
    }
}

const login = (userName: string, password: string)
: AppThunkAction<AuthorizationActions> => 
async (dispatch, getState) => {
    const appState = getState();
    if (appState.root.userData.authorization.isBusy)
        return;
    dispatch({ type: 'AUTHORIZATION/SET_BUSY' })
    const response = await requestService.userController.login(appState, userName, password);
    if (response.success) {
        const user = response.data;
        dispatch({ type: 'AUTHORIZATION/SET_USER', user });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'AUTHORIZATION/SET_ERROR', error });
    }
}

const logout = ()
: AppThunkAction<AuthorizationActions> =>
async (dispatch, getState) => {
    const appState = getState();
    if (appState.root.userData.authorization.isBusy)
        return;
    dispatch({ type: 'AUTHORIZATION/SET_BUSY' })
    const response = await requestService.userController.logout(appState);
    if (response.success) {
        dispatch({ type: 'AUTHORIZATION/SET_USER', user: undefined });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'AUTHORIZATION/SET_ERROR', error });
    }
}

export const authorizationActionCreators = { getCurrentUser, register, login, logout };