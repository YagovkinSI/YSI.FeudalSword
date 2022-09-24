import { ApplicationState, AppThunkAction } from "../../..";
import { requestService } from "../../../RequestService/RequestService";
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
    dispatch({ 
        type: 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR', 
        error: 'В реализации... //TODO',
        contentType: enContentType.Domain,
        contentId: domainId  
    });
}

const setCharacterForLeftCanvas = async (
    appState: ApplicationState,
    dispatch : (action: LeftCanvasActions) => void, 
    characterId: number
) => {
    dispatch({ 
        type: 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR', 
        error: 'В реализации... //TODO',
        contentType: enContentType.Character,
        contentId: characterId  
    });
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
            await setDomainForLeftCanvas(appState, dispatch, contentId);
            break;
        case enContentType.Army:
            await setDomainForLeftCanvas(appState, dispatch, contentId);
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