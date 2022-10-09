import { Action } from "redux";
import { RootState } from "../..";
import { BaseSetBusy, BaseSetData, BaseSetError, baseStateSetBusy, baseStateSetData, baseStateSetError } from "../../Base";
import { IUserCommandsState } from "./UserCommandsState";


export type UserCommandsActions = 
    BaseSetData<'USER_DATA/COMMANDS/SET_TARGET', number | undefined> | 
    BaseSetBusy<'USER_DATA/COMMANDS/SET_BUSY'> | 
    BaseSetError<'USER_DATA/COMMANDS/SET_ERROR'>;

const setTarget = (localState : IUserCommandsState, 
    action : BaseSetData<'USER_DATA/COMMANDS/SET_TARGET', number | undefined>)
: IUserCommandsState => {
    return {
        ...localState,
        targetDomainId: action.data,
        baseState: baseStateSetData(localState.baseState, action.requestId)
    }
}

const setBusy = (localState : IUserCommandsState, action : BaseSetBusy<'USER_DATA/COMMANDS/SET_BUSY'>)
: IUserCommandsState => {
    return {
        ...localState,
        baseState: baseStateSetBusy(localState.baseState, action.requestId)
    }
}

const setError = (localState : IUserCommandsState, action : BaseSetError<'USER_DATA/COMMANDS/SET_ERROR'>)
: IUserCommandsState => {
    return {
        ...localState,
        baseState: baseStateSetError(action.error),
        targetDomainId: undefined
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