import { Action } from "redux";
import { RootState } from "../..";
import { baseSetBusy, BaseSetBusy, baseSetData, BaseSetData, baseSetError, BaseSetError, baseStateSetData, baseStateSetError, IBaseState } from "../../Base";
import { IUserCommandsState } from "./UserCommandsState";

export type UserCommandsActions = 
    BaseSetData<'USER_DATA/COMMANDS/SET_TARGET', IUserCommandsState> | 
    BaseSetBusy<'USER_DATA/COMMANDS/SET_BUSY'> | 
    BaseSetError<'USER_DATA/COMMANDS/SET_ERROR'>;

export const reducerUserCommands = (state: RootState, incomingAction: Action )
: RootState | undefined => {

    const action = incomingAction as  UserCommandsActions;
    if (action == undefined)
        return undefined; 

    let newState = { ...state };
    let localState = newState.userData.commands;
    switch (action.type) {  
        case 'USER_DATA/COMMANDS/SET_TARGET':
            newState.userData.commands = baseSetData(localState, action);
            return newState;
        case 'USER_DATA/COMMANDS/SET_BUSY':
            newState.userData.commands =  baseSetBusy(localState, action);
            return newState;
        case 'USER_DATA/COMMANDS/SET_ERROR':
            newState.userData.commands =  baseSetError(localState, action);
            return newState;
        default:
            return undefined;             
    }
}
