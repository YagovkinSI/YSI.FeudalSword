import { ApplicationState, AppThunkAction } from "../../../../..";
import { IPublicDataApiModel } from "../../../../../../models/IPublicDataApiModel";
import { requestService } from "../../../../../RequestService/RequestService";
import { characterCardHelper } from "./Helpers/CharacterCardHelper";
import { domainCardHelper } from "./Helpers/DomainCardHelper";
import { LeftCanvasActions } from "./LeftCanvasReducer";
import { enContentType } from "./LeftCanvasState";

const closeLeftCanvasMenu = ()
: AppThunkAction<LeftCanvasActions> => async (dispatch, getState) => {
    dispatch({ type: 'UI/MAPPAGE/LEFTCANVAS/CLOSE' })
}

const setDomainForLeftCanvas = async (
    appState: ApplicationState,
    dispatch : (action: LeftCanvasActions) => void, 
    domainId: number
) => {
    if (domainCardHelper.checkDataForDomain(appState.root, domainId))
    {
        dispatch({ 
            type: 'UI/MAPPAGE/LEFTCANVAS/IS_LOADED', 
            contentType: enContentType.Domain,
            contentId: domainId
        });
        return;
    }
    const response = await requestService.domainController.get(appState, domainId);
    if (response.success) {
        dispatch({ 
            type: 'UI/MAPPAGE/LEFTCANVAS/SET_CONTENT', 
            contentType: enContentType.Domain,
            contentId: domainId,
            publicData: response.data as IPublicDataApiModel
        });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR', 
            error,
            contentType: enContentType.Domain,
            contentId: domainId
        });
    }
}

const setCharacterForLeftCanvas = async (
    appState: ApplicationState,
    dispatch : (action: LeftCanvasActions) => void, 
    characterId: number
) => {
    if (characterCardHelper.checkDataForCharacter(appState.root, characterId))
    {
        dispatch({ 
            type: 'UI/MAPPAGE/LEFTCANVAS/IS_LOADED', 
            contentType: enContentType.Character,
            contentId: characterId
        });
        return;
    }
    const response = await requestService.characterController.get(appState, characterId);
    if (response.success) {
        dispatch({ 
            type: 'UI/MAPPAGE/LEFTCANVAS/SET_CONTENT', 
            contentType: enContentType.Character,
            contentId: characterId,
            publicData: response.data as IPublicDataApiModel
        });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR', 
            error,
            contentType: enContentType.Character,
            contentId: characterId
        });
    }
}

const setArmyForLeftCanvas = async (
    appState: ApplicationState,
    dispatch : (action: LeftCanvasActions) => void, 
    armyId: number
) => {
    dispatch({ 
        type: 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR', 
        error: 'В реализации... //TODO',
        contentType: enContentType.Army,
        contentId: armyId  
    });
}

const setContentForLeftCanvas = (contentType : enContentType, contentId : number )
: AppThunkAction<LeftCanvasActions> => async (dispatch, getState) => {
    const appState = getState();
    dispatch({ type: 'UI/MAPPAGE/LEFTCANVAS/SET_BUSY', contentType, contentId});
    switch (contentType) {
        case enContentType.Domain:
            await setDomainForLeftCanvas(appState, dispatch, contentId);
            break;
        case enContentType.Character:
            await setCharacterForLeftCanvas(appState, dispatch, contentId);
            break;
        case enContentType.Army:
            await setArmyForLeftCanvas(appState, dispatch, contentId);
            break;
        default:
            dispatch({ 
                type: 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR', 
                error: `Неизвестный тип контента ${contentType}`,
                contentType: contentType,
                contentId: contentId
            });
            break;
    }
}

export const leftCanvasActionCreators = { closeLeftCanvasMenu, setContentForLeftCanvas };