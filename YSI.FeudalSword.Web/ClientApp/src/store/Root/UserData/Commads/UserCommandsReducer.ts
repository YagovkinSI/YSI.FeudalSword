import { Action } from "redux";
import { RootState } from "../..";
import { IUserCommandsState } from "./UserCommandsState";


interface SetTarget {
    type: 'USER_DATA/COMMANDS/SET_TARGET';
    targetDomainId: number | undefined
}

interface SetBusy {
    type: 'USER_DATA/COMMANDS/SET_BUSY';
}

interface SetError {
    type: 'USER_DATA/COMMANDS/SET_ERROR';
    error: string
}

export type UserCommandsActions = SetTarget | SetBusy | SetError;

const setTarget = (localState : IUserCommandsState, action : SetTarget)
: IUserCommandsState => {
    return {
        ...localState,
        targetDomainId: action.targetDomainId
    }
}

const setBusy = (localState : IUserCommandsState, action : SetBusy)
: IUserCommandsState => {
    return {
        ...localState,
        isBusy: true
    }
}

const setError = (localState : IUserCommandsState, action : SetError)
: IUserCommandsState => {
    return {
        ...localState,
        isChecked: true,
        isBusy: false,
        targetDomainId: undefined,
        error: action.error
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
        case 'USER_DATA/COMMANDS/SET_BUSY':
            newState.userData.commands =  setBusy(localState, action);
            return newState;
        case 'USER_DATA/COMMANDS/SET_ERROR':
            newState.userData.commands =  setError(localState, action);
            return newState;
        default:
            return undefined;             
    }
}