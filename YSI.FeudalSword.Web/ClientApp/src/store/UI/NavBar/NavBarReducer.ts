import { RootState } from "../../Root";

interface Close {
    type: 'CLOSE'
}

interface Toggle {
    type: 'TOGGLE'
}

export type NavBarActions = Close | Toggle;

export const reducerNavBar = (state : RootState, action : NavBarActions) 
: RootState | undefined => 
{
    switch (action.type) {  
        case 'CLOSE':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    navBar: {
                        isOpen: false
                    }
                }
            } 
        case 'TOGGLE':
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