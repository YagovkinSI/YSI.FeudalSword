import { Action } from "redux";
import { RootState } from "../../../..";
import { IPublicDataApiModel } from "../../../../../../models/IPublicDataApiModel";
import { publicDataHelper } from "../../../../PublicData/Base/PublicDataHelper";
import { enContentType, LeftCanvasState } from "./LeftCanvasState";

interface Close {
    type: 'UI/MAPPAGE/LEFTCANVAS/CLOSE'
}

interface SetContent {
    type: 'UI/MAPPAGE/LEFTCANVAS/SET_CONTENT',
    contentType: enContentType,
    contentId: number,
    publicData: IPublicDataApiModel
}

interface SetError {
    type: 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR',
    error: string,
    contentType: enContentType,
    contentId: number
}

interface SetBusy {
    type: 'UI/MAPPAGE/LEFTCANVAS/SET_BUSY',
    contentType: enContentType,
    contentId: number
}

interface IsLoaded {
    type: 'UI/MAPPAGE/LEFTCANVAS/IS_LOADED',
    contentType: enContentType,
    contentId: number
}

export type LeftCanvasActions = Close | SetContent | SetError | SetBusy | IsLoaded;

const close = (localState : LeftCanvasState, action : Close)
: LeftCanvasState => {
    localState = {
        ...localState,
        isOpen: false
    }
    return localState;
}

const setContent = (localState : LeftCanvasState, action : SetContent)
: LeftCanvasState => {
    localState = {
        ...localState,
        isBusy: undefined
    }
    return localState;
}

const setError = (localState : LeftCanvasState, action : SetError)
: LeftCanvasState => {
    return {
        ...localState,
        isBusy: undefined,
        error: action.error
    }
}

const setBusy = (localState : LeftCanvasState, action : SetBusy)
: LeftCanvasState => {
    const requestBusyId = `${action.contentType}_${action.contentId}`;
    return {
        ...localState,
        isBusy: requestBusyId,
        isOpen: true,
        error: undefined,
        contentType: action.contentType,
        contentId: action.contentId
    }
}

const isLoaded = (localState : LeftCanvasState, action : IsLoaded)
: LeftCanvasState => {
    return {
        ...localState,
        isBusy: undefined,
        isOpen: true,
        error: undefined,
        contentType: action.contentType,
        contentId: action.contentId
    }
}

export const reducerLeftCanvas = (state : RootState, incomingAction : Action) 
: RootState | undefined => 
{
    const action = incomingAction as LeftCanvasActions;
    if (action == undefined)
        return undefined; 

    let newState = { ...state };
    let localState = newState.userData.ui.mapPage.leftCanvas;
    switch (action.type) {  
        case 'UI/MAPPAGE/LEFTCANVAS/CLOSE':
            newState.userData.ui.mapPage.leftCanvas = close(localState, action);
            return newState;
        case 'UI/MAPPAGE/LEFTCANVAS/SET_CONTENT':
            const requestContentId = `${action.contentType}_${action.contentId}`;
            publicDataHelper.update(state, action.publicData)
            if (state.userData.ui.mapPage.leftCanvas.isBusy != requestContentId)
                return state;
            newState.userData.ui.mapPage.leftCanvas = setContent(localState, action);
            return newState;
        case 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR':
            const requestErrorId = `${action.contentType}_${action.contentId}`;
            if (state.userData.ui.mapPage.leftCanvas.isBusy != requestErrorId)
                return state;
            newState.userData.ui.mapPage.leftCanvas = setError(localState, action);
            return newState;
        case 'UI/MAPPAGE/LEFTCANVAS/SET_BUSY':
            newState.userData.ui.mapPage.leftCanvas = setBusy(localState, action);
            return newState;
        case 'UI/MAPPAGE/LEFTCANVAS/IS_LOADED':
            const requestIsLoadedId = `${action.contentType}_${action.contentId}`;
            if (state.userData.ui.mapPage.leftCanvas.isBusy != requestIsLoadedId)
                return state;
            newState.userData.ui.mapPage.leftCanvas = isLoaded(localState, action);
            return newState;
        default:
            return undefined;             
    }
}