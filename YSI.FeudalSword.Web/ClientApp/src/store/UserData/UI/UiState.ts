import { defaultMapPageState, MapPageState } from "./MapPage/MapPageState"
import { defaultNavBarState, NavBarState } from "./NavBar/NavBarState"

export interface UiState {
    navBar: NavBarState,
    mapPage: MapPageState
}

export const defaultUiState : UiState = {
    navBar: defaultNavBarState,
    mapPage: defaultMapPageState
}