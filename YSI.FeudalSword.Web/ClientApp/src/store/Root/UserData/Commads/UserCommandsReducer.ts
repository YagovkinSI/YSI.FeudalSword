import { Action } from "redux";
import { RootState } from "../..";
import { IUserCommandsState } from "./UserCommandsState";


interface SetTarget {
    type: 'USER_DATA/COMMANDS/SET_TARGET';
    targetDomainId: number | undefined
}

export type UserCommandsActions = SetTarget;

const setTarget = (localState : IUserCommandsState, action : SetTarget)
: IUserCommandsState => {
    return {
        ...localState,
        targetDomainId: action.targetDomainId
    }
}

export const reducerUserCommands = (state: RootState, incomingAction: Action )
: RootState | undefined => {

    const action = incomingAction as  UserCommandsActions;
    if (action == undefined)
        return undefined; 

    let newState = { ...state };
    let localState = newState.userData.commands;
    switch (action.type) {  
        case 'USER_DATA/COMMANDS/SET_TARGET':
            newState.userData.commands = setTarget(localState, action);
            return newState;
        default:
            return undefined;             
    }
}