import { RootState } from "../../Root";


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

export const reducerUserCharacter = (state: RootState, action: UserCharacterActions )
: RootState | undefined => {

    switch (action.type) {  
        case 'USER_DATA/CHARACTER/SET_CHARACTER':
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
        case 'USER_DATA/CHARACTER/SET_BUSY':
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
        case 'USER_DATA/CHARACTER/SET_ERROR':
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
        default:
            return undefined;             
    }
}