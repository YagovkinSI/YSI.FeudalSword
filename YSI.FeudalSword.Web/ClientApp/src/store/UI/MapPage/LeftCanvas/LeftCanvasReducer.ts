import { RootState } from "../../../Root";
import { enContentType } from "./LeftCanvasState";

interface Close {
    type: 'UI/MAPPAGE/LEFTCANVAS/CLOSE'
}

interface SetContent {
    type: 'UI/MAPPAGE/LEFTCANVAS/SET_CONTENT',
    contentType: enContentType,
    contentId: number
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

export type LeftCanvasActions = Close | SetContent | SetError | SetBusy;

export const reducerLeftCanvas = (state : RootState, action : LeftCanvasActions) 
: RootState | undefined => 
{
    switch (action.type) {  
        case 'UI/MAPPAGE/LEFTCANVAS/CLOSE':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    mapPage: {
                        ...state.ui.mapPage,
                        leftCanvas: {
                            ...state.ui.mapPage.leftCanvas,
                            isOpen: false
                        }
                    }
                }
            } 
        case 'UI/MAPPAGE/LEFTCANVAS/SET_CONTENT':
            const requestContentId = `${action.contentType}_${action.contentId}`;
            if (state.ui.mapPage.leftCanvas.isBusy != requestContentId)
                return state;
            return {
                ...state,
                ui: {
                    ...state.ui,
                    mapPage: {
                        ...state.ui.mapPage,
                        leftCanvas: {
                            ...state.ui.mapPage.leftCanvas,
                            isBusy: undefined
                        }
                    }
                }
            }
        case 'UI/MAPPAGE/LEFTCANVAS/SET_ERROR':
            const requestErrorId = `${action.contentType}_${action.contentId}`;
            if (state.ui.mapPage.leftCanvas.isBusy != requestErrorId)
                return state;
            return {
                ...state,
                ui: {
                    ...state.ui,
                    mapPage: {
                        ...state.ui.mapPage,
                        leftCanvas: {
                            ...state.ui.mapPage.leftCanvas,
                            isBusy: undefined,
                            error: action.error
                        }
                    }
                }
            }
        case 'UI/MAPPAGE/LEFTCANVAS/SET_BUSY':
            const requestBusyId = `${action.contentType}_${action.contentId}`;
            return {
                ...state,
                ui: {
                    ...state.ui,
                    mapPage: {
                        ...state.ui.mapPage,
                        leftCanvas: {
                            ...state.ui.mapPage.leftCanvas,
                            isBusy: requestBusyId,
                            isOpen: true,
                            error: undefined,
                            contentType: action.contentType,
                            contentId: action.contentId
                        }
                    }
                }
            }
        default:
            return undefined;             
    }
}