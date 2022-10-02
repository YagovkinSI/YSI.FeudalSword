import { Action } from "redux";
import { RootState } from "../..";
import { IUserChatacterState } from "./UserChatacterState";


interface SetCharacter {
    type: 'USER_DATA/CHARACTER/SET_CHARACTER';
    characterId: number | undefined
}

interface SetBusy {
    type: 'USER_DATA/CHARACTER/SET_BUSY';
}

interface SetError {
    type: 'USER_DATA/CHARACTER/SET_ERROR';
    error: string
}

export type UserCharacterActions = SetCharacter | SetBusy | SetError;

const setCharacter = (localState : IUserChatacterState, action : SetCharacter)
: IUserChatacterState => {
    return {
        ...localState,
        isChecked: true,
        isBusy: false,
        error: undefined,
        characterId: action.characterId
    }
}

const setBusy = (localState : IUserChatacterState, action : SetBusy)
: IUserChatacterState => {
    return {
        ...localState,
        isBusy: true
    }
}

const setError = (localState : IUserChatacterState, action : SetError)
: IUserChatacterState => {
    return {
        ...localState,
        isChecked: true,
        isBusy: false,
        characterId: undefined,
        error: action.error
    }
}

export const reducerUserCharacter = (state: RootState, incomingAction: Action )
: RootState | undefined => {

    const action = incomingAction as  UserCharacterActions;
    if (action == undefined)
        return undefined; 

    let newState = { ...state };
    let localState = newState.userData.character;
    switch (action.type) {  
        case 'USER_DATA/CHARACTER/SET_CHARACTER':
            newState.userData.character = setCharacter(localState, action);
            return newState;
        case 'USER_DATA/CHARACTER/SET_BUSY':
            newState.userData.character =  setBusy(localState, action);
            return newState;
        case 'USER_DATA/CHARACTER/SET_ERROR':
            newState.userData.character =  setError(localState, action);
            return newState;
        default:
            return undefined;             
    }
}