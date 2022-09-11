import { IUiState } from "../ui";
import { ISetErrorField, ISetLoginMenu } from "./actions";

export type NavBarAction = ISetLoginMenu | ISetErrorField;

export const reducerNavBar = (state : IUiState, action : NavBarAction) : IUiState | undefined => 
{
    switch (action.type) {  
        case 'SET_LOGIN_MENU':
            return {
                ...state,
                navBar: {
                    ...state.navBar,
                    loginMenu: {
                        ...state.navBar.loginMenu,
                        isAuthorizated: action.isAuthorizated,
                        isLoading: action.isLoading
                    }
                }
            }
        case 'SET_ERROR_FIELD':
            return {
                ...state,
                navBar: {
                    ...state.navBar,
                    errorField: {
                        ...state.navBar.errorField,
                        show: action.show,
                        message: action.message
                    }
                }
            }
        default:
            return undefined;             
    }
}