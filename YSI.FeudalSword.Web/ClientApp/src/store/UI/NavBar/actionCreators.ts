import { AppThunkAction } from "../..";
import { NavBarAction } from "./reducer";
import * as RequestHelper from "../../RequsetService/Controllers/User";
import { PrivateDataService } from "../../DataService/dataService";

const getCurrentUser = (): AppThunkAction<NavBarAction> => async (dispatch, getState) => {
    const appState = getState();
    dispatch({ 
        type: 'SET_LOGIN_MENU',
        isAuthorizated: false,
        isLoading: true
    });
    const privateUserData = await PrivateDataService.UserPrivateData.getPrivateUserData(appState);
    dispatch({ 
        type: 'SET_LOGIN_MENU',
        isAuthorizated: privateUserData.data == undefined
            ? false
            : privateUserData.data.currentUser != undefined,
        isLoading: false
    });
    if (!privateUserData.success)
        dispatch({ 
            type: 'SET_ERROR_FIELD',
            show: true,
            message: privateUserData.error
        });
}

const register = (userName: string, password: string, passwordConfirm: string)
: AppThunkAction<NavBarAction> => async (dispatch, getState) => {    
    const appState = getState();
    dispatch({ 
        type: 'SET_LOGIN_MENU',
        isAuthorizated: false,
        isLoading: true
    });
    const privateUserData = await RequestHelper.register(appState, userName, password, passwordConfirm);
    dispatch({ 
        type: 'SET_LOGIN_MENU',
        isAuthorizated: privateUserData.data != undefined,
        isLoading: false
    });
    if (!privateUserData.success)
        dispatch({ 
            type: 'SET_ERROR_FIELD',
            show: true,
            message: privateUserData.error
        });
}

const login = (userName: string, password: string): AppThunkAction<NavBarAction> => 
async (dispatch, getState) => {
    const appState = getState();
    dispatch({ 
        type: 'SET_LOGIN_MENU',
        isAuthorizated: false,
        isLoading: true
    });
    const privateUserData = await RequestHelper.login(appState, userName, password);
    dispatch({ 
        type: 'SET_LOGIN_MENU',
        isAuthorizated: privateUserData.data != undefined,
        isLoading: false
    });
    if (!privateUserData.success)
        dispatch({ 
            type: 'SET_ERROR_FIELD',
            show: true,
            message: privateUserData.error
        });
}

const logout = (): AppThunkAction<NavBarAction> =>
async (dispatch, getState) => {
    const appState = getState();
    const currentUser = appState.privateData.user.currentUser;
    appState.privateData.user.currentUser = undefined;
    dispatch({ 
        type: 'SET_LOGIN_MENU',
        isAuthorizated: false,
        isLoading: true
    });
    const privateUserData = await RequestHelper.logout(appState);
    dispatch({ 
        type: 'SET_LOGIN_MENU',
        isAuthorizated: privateUserData.success 
            ? false
            : appState.privateData.user.currentUser != undefined,
        isLoading: false
    });
    if (!privateUserData.success)
    {        
        appState.privateData.user.currentUser = currentUser;
        dispatch({ 
            type: 'SET_ERROR_FIELD',
            show: true,
            message: privateUserData.error
        });
    }
}

export const navBarActionCreators = { getCurrentUser, register, login, logout };

