import { Action } from "redux";
import { RootState } from "../../..";

interface Close {
    type: 'UI/NAVBAR/CLOSE'
}

interface Toggle {
    type: 'UI/NAVBAR/TOGGLE'
}

export type NavBarActions = Close | Toggle;

const close = (state : RootState, action : Close)
: RootState => {
    return {
        ...state,
        userData: {
            ...state.userData,
            ui: {
                ...state.userData.ui,
                navBar: {
                    isOpen: false
                }
            }
        }
    } 
}

const toggle = (state : RootState, action : Toggle)
: RootState => {
    return {
        ...state,
        userData: {
            ...state.userData,
            ui: {
                ...state.userData.ui,
                navBar: {
                    isOpen: !state.userData.ui.navBar.isOpen
                }
            }
        }
    }
}

export const reducerNavBar = (state : RootState, incomingAction : Action) 
: RootState | undefined => 
{
    const action = incomingAction as NavBarActions
    switch (action.type) {  
        case 'UI/NAVBAR/CLOSE':
            return close(state, action);
        case 'UI/NAVBAR/TOGGLE':
            return toggle(state, action);
        default:
            return undefined;             
    }
}