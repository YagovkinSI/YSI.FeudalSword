import { Action } from "redux";
import { RootState } from "../..";


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

const setCharacter = (state : RootState, action : SetCharacter)
: RootState => {
    return {
        ...state,
        userData: {
            ...state.userData,
            character: {
                ...state.userData.character,
                isChecked: true,
                isBusy: false,
                error: undefined,
                characterId: action.characterId
            }
        }
    }
}

const setBusy = (state : RootState, action : SetBusy)
: RootState => {
    return {
        ...state,
        userData: {
            ...state.userData,
            character: {
                ...state.userData.character,
                isBusy: true
            }
        }
    }
}

const setError = (state : RootState, action : SetError)
: RootState => {
    return {
        ...state,
        userData: {
            ...state.userData,
            character: {
                ...state.userData.character,
                isChecked: true,
                isBusy: false,
                characterId: undefined,
                error: action.error
            }
        }
    }
}

export const reducerUserCharacter = (state: RootState, incomingAction: Action )
: RootState | undefined => {

    const action = incomingAction as  UserCharacterActions;
    if (action == undefined)
        return undefined; 
    switch (action.type) {  
        case 'USER_DATA/CHARACTER/SET_CHARACTER':
            return setCharacter(state, action);
        case 'USER_DATA/CHARACTER/SET_BUSY':
            return setBusy(state, action);
        case 'USER_DATA/CHARACTER/SET_ERROR':
            return setError(state, action);
        default:
            return undefined;             
    }
}