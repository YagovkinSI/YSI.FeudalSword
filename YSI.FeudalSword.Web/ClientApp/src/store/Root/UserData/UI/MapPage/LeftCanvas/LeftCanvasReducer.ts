import { Action } from "redux";
import { RootState } from "../../../..";
import { IPublicDataApiModel } from "../../../../../../models/IPublicDataApiModel";
import { publicDataHelper } from "../../../../PublicData/Base/PublicDataHelper";
import { enContentType } from "./LeftCanvasState";

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

export const reducerLeftCanvas = (state : RootState, incomingAction : Action) 
: RootState | undefined => 
{
    const action = incomingAction as LeftCanvasActions;
    if (action == undefined)
        return undefined; 
    switch (action.type) {  
        case 'UI/MAPPAGE/LEFTCANVAS/CLOSE':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ui: {
                        ...state.userData.ui,
                        mapPage: {
                            ...state.userData.ui.mapPage,
                            leftCanvas: {
                                ...state.userData.ui.mapPage.leftCanvas,
                                isOpen: false
                            }
                        }
                    }
                }
            } 
        case 'UI/MAPPAGE/LEFTCANVAS/SET_CONTENT':
            const requestContentId = `${action.contentType}_${action.contentId}`;
            publicDataHelper.update(state, action.publicData)
            if (state.userData.ui.mapPage.leftCanvas.isBusy != requestContentId)
                return state;
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ui: {
                        ...state.userData.ui,
                        mapPage: {
                            ...state.userData.ui.mapPage,
                            leftCanvas: {
                                ...state.userData.ui.mapPage.leftCanvas,
                                isBusy: undefined
                            }
                        }
                    }
                }
            }
        case 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR':
            const requestErrorId = `${action.contentType}_${action.contentId}`;
            if (state.userData.ui.mapPage.leftCanvas.isBusy != requestErrorId)
                return state;
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ui: {
                        ...state.userData.ui,
                        mapPage: {
                            ...state.userData.ui.mapPage,
                            leftCanvas: {
                                ...state.userData.ui.mapPage.leftCanvas,
                                isBusy: undefined,
                                error: action.error
                            }
                        }
                    }
                }
            }
        case 'UI/MAPPAGE/LEFTCANVAS/SET_BUSY':
            const requestBusyId = `${action.contentType}_${action.contentId}`;
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ui: {
                        ...state.userData.ui,
                        mapPage: {
                            ...state.userData.ui.mapPage,
                            leftCanvas: {
                                ...state.userData.ui.mapPage.leftCanvas,
                                isBusy: requestBusyId,
                                isOpen: true,
                                error: undefined,
                                contentType: action.contentType,
                                contentId: action.contentId
                            }
                        }
                    }
                }
            }
        case 'UI/MAPPAGE/LEFTCANVAS/IS_LOADED':
            const requestIsLoadedId = `${action.contentType}_${action.contentId}`;
            if (state.userData.ui.mapPage.leftCanvas.isBusy != requestIsLoadedId)
                return state;
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ui: {
                        ...state.userData.ui,
                        mapPage: {
                            ...state.userData.ui.mapPage,
                            leftCanvas: {
                                ...state.userData.ui.mapPage.leftCanvas,
                                isBusy: undefined,
                                isOpen: true,
                                error: undefined,
                                contentType: action.contentType,
                                contentId: action.contentId
                            }
                        }
                    }
                }
            }
        default:
            return undefined;             
    }
}