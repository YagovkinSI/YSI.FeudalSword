import { Action, Reducer } from "redux";
import { ApplicationState, AppThunkAction } from "..";
import * as DataHelper from "../../helpers/DataHelper";
import * as RequestHelper from "../../helpers/RequestHelper";

export interface IWorldMapState {
    mapType: enMapType,
    contentId: number | undefined,
    contentStatus: enContentStatus
}

export enum enContentStatus {
    None = 0,
    Loading = 1,
    Loaded = 2
}

export enum enMapType {
    Main = 0
}

const defaultWorldMap : IWorldMapState = {
    mapType: enMapType.Main,
    contentId: undefined,
    contentStatus: enContentStatus.None
}

export interface SetContent {
    type: 'SET_CONTENT',
    contentId: number | undefined,
    contentStatus: enContentStatus
}

type KnownAction = SetContent;

export const reducer : Reducer<IWorldMapState> = (
    state: IWorldMapState = defaultWorldMap,
    incomingAction: Action
) : IWorldMapState => {

    const action = incomingAction as KnownAction;
    switch (action.type)
    {
        case 'SET_CONTENT':
            return {
                ...state,
                contentId: action.contentId,
                contentStatus: action.contentStatus
            } 
        default:
            return state;          
    }
}

const dispatchSetContent = (
    dispatch : (action: KnownAction) => void,
    contentStatus: enContentStatus,
    contentId: number | undefined = undefined
) => {
    dispatch({ 
        type: 'SET_CONTENT', contentId, contentStatus
    });
}

const loadCharacterId = async (
    appState : ApplicationState,
    dispatch : (action: KnownAction) => void,
    domainId : number
) => {
    dispatchSetContent(dispatch, enContentStatus.Loading);
    const response = await RequestHelper.getByTitle(appState, domainId);
    if (response.success)    
        dispatchSetContent(dispatch, enContentStatus.Loaded, response.data.id);
    else  
        dispatchSetContent(dispatch, enContentStatus.Loaded);
}

const setContentForMainMapType = (
    appState : ApplicationState,
    dispatch : (action: KnownAction) => void,
    domainId : number
) => {
    const characterId = DataHelper.getCharacterIdByDomainId(appState, domainId);
    if (characterId == undefined)
        loadCharacterId(appState, dispatch, domainId)    
    else
        dispatchSetContent(dispatch, enContentStatus.Loaded, characterId);
}

const setContent = (domainId : number) 
: AppThunkAction<KnownAction> => async (dispatch, getState) => { 
    const appState = getState();
    const mapType = appState.uiWorldMapState == undefined
        ? enMapType.Main
        : appState.uiWorldMapState.mapType;
    switch (mapType) {
        case enMapType.Main:
        default:
            setContentForMainMapType(appState, dispatch, domainId);
            break;
    }   
}

const contentShowed = () : AppThunkAction<KnownAction> => async (dispatch, getState) => { 
    const appState = getState();
    const currentContentId = appState.uiWorldMapState == undefined
        ? undefined
        : appState.uiWorldMapState.contentId;
    dispatchSetContent(dispatch, enContentStatus.None, currentContentId);
}

export const actionCreators = { setContent, contentShowed }