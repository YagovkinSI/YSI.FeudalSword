import { AppThunkAction } from "..";
import { IPublicDataApiModel } from "../../models/IPublicDataApiModel";
import { requestService } from "../RequestService/RequestService";
import { PublicDataActions } from "./PublicDataReducer";


const loadCharacter = (characterId : number) 
: AppThunkAction<PublicDataActions> => async (dispatch, getState) => {
    const appState = getState();
    const loadingId = `loadCharacter ${characterId}`;
    console.log('some', loadingId, appState.root.publicData.loadings, appState.root.publicData.loadings.some(l => l == loadingId))
    if (!appState.root.publicData.loadings.some(l => l == loadingId))
    {   
        console.log('inside');
        dispatch({ type: 'PUBLIC_DATA/LOAD_DATA', loadingId});
        const response = await requestService.characterController.get(appState, characterId);
        if (response.success) {
            dispatch({ 
                type: 'PUBLIC_DATA/LOADED_DATA', 
                loadingId,
                publicData: response.data as IPublicDataApiModel 
            });
        } else {
            const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
            console.log(error);
            //TODO
        }
    }
}

export const publicDataActionCreators = { loadCharacter }