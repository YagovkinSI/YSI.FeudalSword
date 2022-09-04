import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";

export interface ILeftCanvasSate {
    show: boolean,
    contentType: enLeftCanvasContentType,
    contentId: number | undefined
}

export enum enLeftCanvasContentType {
    None = 0,
    Character = 1
}

const defaultLeftCanvas : ILeftCanvasSate = {
    contentId: 0,
    contentType: enLeftCanvasContentType.None,
    show: false
}

interface IShowLeftCanvas {
    type: 'SHOW',
    contentType: enLeftCanvasContentType,
    contentId: number | undefined
}

interface IHideLeftCanvas {
    type: 'HIDE'
}

type KnownAction = IShowLeftCanvas | IHideLeftCanvas;

export const reducer: Reducer<ILeftCanvasSate> = (
    state: ILeftCanvasSate = defaultLeftCanvas,
    incomingAction: Action
) : ILeftCanvasSate => {
    
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SHOW':
            return {
                ...state,
                contentId: action.contentId,
                contentType: action.contentType,
                show: true
            }    
        case 'HIDE':
            return {
                ...state,
                show: false
            }  
    }
    return state;
}

const show = (contentType: enLeftCanvasContentType, contentId: number | undefined) 
: AppThunkAction<KnownAction> => async (dispatch, getState) => {
    dispatch({
        type: 'SHOW', contentType, contentId 
    })
}

const hide = () 
: AppThunkAction<KnownAction> => async (dispatch, getState) => {
    dispatch({
        type: 'HIDE' 
    })
}

export const actionCreators = { show, hide };

