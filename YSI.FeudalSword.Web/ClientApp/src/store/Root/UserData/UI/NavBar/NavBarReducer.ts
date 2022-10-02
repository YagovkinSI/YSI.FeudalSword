import { Action } from "redux";
import { RootState } from "../../..";

interface Close {
    type: 'UI/NAVBAR/CLOSE'
}

interface Toggle {
    type: 'UI/NAVBAR/TOGGLE'
}

export type NavBarActions = Close | Toggle;

export const reducerNavBar = (state : RootState, incomingAction : Action) 
: RootState | undefined => 
{
    const action = incomingAction as NavBarActions
    switch (action.type) {  
        case 'UI/NAVBAR/CLOSE':
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
        case 'UI/NAVBAR/TOGGLE':
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
        default:
            return undefined;             
    }
}