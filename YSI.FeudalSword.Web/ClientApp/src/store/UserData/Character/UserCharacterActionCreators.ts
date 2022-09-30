import { AppThunkAction } from "../..";
import { publicDataActionCreators } from "../../PublicData/PublicDataActionCreators";
import { requestService } from "../../RequestService/RequestService";
import { UserCharacterActions } from "./UserCharacterReducer";

const getUserCharacter = ()
: AppThunkAction<UserCharacterActions> => async (dispatch, getState) => {
    const appState = getState();
    if (appState.root.userData.character.isBusy)
        return;
    dispatch({ type: 'USER_DATA/CHARACTER/SET_BUSY' })
    const response = await requestService.characterController.getUserCharacter(appState);
    if (response.success) {
        const characterId = response.data == undefined 
            ? undefined 
            : response.data.character == undefined
                ? undefined
                : response.data.character.id;        
        if (characterId != undefined)
            publicDataActionCreators.loadCharacter(characterId)
        dispatch({ type: 'USER_DATA/CHARACTER/SET_CHARACTER', characterId });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'USER_DATA/CHARACTER/SET_ERROR', error });
    }
}

const takeCharacter = (characterId : number)
: AppThunkAction<UserCharacterActions> => async (dispatch, getState) => {
    const appState = getState();
    if (appState.root.userData.character.isBusy || 
        appState.root.userData.character.characterId != undefined)
        return;
    dispatch({ type: 'USER_DATA/CHARACTER/SET_BUSY' });
    const response = await requestService.characterController.takeCharacter(appState, characterId);
    if (response.success) {
        const characterId = response.data;
        appState.root.publicData.characters = appState.root.publicData.characters
            .filter(c => c.id != characterId);
        if (characterId != undefined)
            publicDataActionCreators.loadCharacter(characterId);
        dispatch({ type: 'USER_DATA/CHARACTER/SET_CHARACTER', characterId });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'USER_DATA/CHARACTER/SET_ERROR', error });
    }
}

export const userCharacterActionCreators = { getUserCharacter, takeCharacter };