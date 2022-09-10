import { Action, Reducer } from "redux";
import { defaultMapPage } from "./MapPage/defaultState";
import { MapPageAction, reducerMapPage } from "./MapPage/reducer";
import { IMapPageState } from "./MapPage/state";

export interface IUiState {
    mapPage: IMapPageState
}

const defaultUiState : IUiState = {
    mapPage: defaultMapPage
}

export const reducer: Reducer<IUiState> = (
    state: IUiState = defaultUiState,
    incomingAction: Action
) : IUiState => {       
    if (incomingAction as MapPageAction != undefined)
        return reducerMapPage(state, incomingAction as MapPageAction);
    else return state;
}