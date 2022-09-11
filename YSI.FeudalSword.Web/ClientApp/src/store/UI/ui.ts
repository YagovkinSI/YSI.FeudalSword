import { Action, Reducer } from "redux";
import { defaultMapPage } from "./MapPage/defaultState";
import { MapPageAction, reducerMapPage } from "./MapPage/reducer";
import { IMapPageState } from "./MapPage/state";
import { defaultNavBar } from "./NavBar/defaultState";
import { NavBarAction, reducerNavBar } from "./NavBar/reducer";
import { INavBarState } from "./NavBar/state";

export interface IUiState {
    mapPage: IMapPageState,
    navBar: INavBarState
}

const defaultUiState : IUiState = {
    mapPage: defaultMapPage,
    navBar: defaultNavBar
}

export const reducer: Reducer<IUiState> = (
    state: IUiState = defaultUiState,
    incomingAction: Action
) : IUiState => {    
    let newState = reducerMapPage(state, incomingAction as MapPageAction);
    if (newState != undefined)
        return newState;

    newState = reducerNavBar(state, incomingAction as NavBarAction);
    if (newState != undefined)
        return newState;

    return state;
}