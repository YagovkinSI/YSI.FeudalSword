import { AppThunkAction } from "..";
import { IPublicDataApiModel } from "../../models/IPublicDataApiModel";
import { requestService } from "../RequestService/RequestService";
import { PublicDataActions } from "./PublicDataReducer";


const loadCharacter = (characterId : number) 
: AppThunkAction<PublicDataActions> => async (dispatch, getState) => {
    const appState = getState();
    const loadingId = `loadCharacter ${characterId}`;
    if (!appState.root.publicData.loadings.some(l => l == loadingId))
    {   
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

const loadArmy = (armyId : number) 
: AppThunkAction<PublicDataActions> => async (dispatch, getState) => {
    const appState = getState();
    const loadingId = `loadArmy ${armyId}`;
    if (!appState.root.publicData.loadings.some(l => l == loadingId))
    {   
        dispatch({ type: 'PUBLIC_DATA/LOAD_DATA', loadingId});
        const response = await requestService.armyController.get(appState, armyId);
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

const loadDomain = (domainId : number) 
: AppThunkAction<PublicDataActions> => async (dispatch, getState) => {
    const appState = getState();
    const loadingId = `loadDomain ${domainId}`;
    if (!appState.root.publicData.loadings.some(l => l == loadingId))
    {   
        dispatch({ type: 'PUBLIC_DATA/LOAD_DATA', loadingId});
        const response = await requestService.domainController.get(appState, domainId);
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

export const publicDataActionCreators = { loadCharacter, loadArmy, loadDomain }