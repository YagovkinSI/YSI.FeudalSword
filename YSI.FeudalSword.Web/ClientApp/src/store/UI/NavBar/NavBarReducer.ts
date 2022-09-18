import { RootState } from "../../Root";

interface Close {
    type: 'UI/NAVBAR/CLOSE'
}

interface Toggle {
    type: 'UI/NAVBAR/TOGGLE'
}

export type NavBarActions = Close | Toggle;

export const reducerNavBar = (state : RootState, action : NavBarActions) 
: RootState | undefined => 
{
    switch (action.type) {  
        case 'UI/NAVBAR/CLOSE':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    navBar: {
                        isOpen: false
                    }
                }
            } 
        case 'UI/NAVBAR/TOGGLE':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    navBar: {
                        isOpen: !state.ui.navBar.isOpen
                    }
                }
            }
        default:
            return undefined;             
    }
}