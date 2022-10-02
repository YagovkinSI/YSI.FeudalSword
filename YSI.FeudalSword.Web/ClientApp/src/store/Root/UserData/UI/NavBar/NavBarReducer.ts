import { Action } from "redux";
import { RootState } from "../../..";
import { NavBarState } from "./NavBarState";

interface Close {
    type: 'UI/NAVBAR/CLOSE'
}

interface Toggle {
    type: 'UI/NAVBAR/TOGGLE'
}

export type NavBarActions = Close | Toggle;

const close = (localState : NavBarState, action : Close)
: NavBarState => {
    return {
        ...localState,
        isOpen: false
    } 
}

const toggle = (localState : NavBarState, action : Toggle)
: NavBarState => {
    return {
        ...localState,
        isOpen: !localState.isOpen
    }
}

export const reducerNavBar = (state : RootState, incomingAction : Action) 
: RootState | undefined => 
{
    const action = incomingAction as NavBarActions;
    if (action == undefined)
        return undefined;
    
    let newState = { ...state };
    const localState = newState.userData.ui.navBar;
    switch (action.type) {  
        case 'UI/NAVBAR/CLOSE':
            newState.userData.ui.navBar = close(localState, action);
            return newState;
        case 'UI/NAVBAR/TOGGLE':
            newState.userData.ui.navBar = toggle(localState, action);
            return newState;
        default:
            return undefined;             
    }
}