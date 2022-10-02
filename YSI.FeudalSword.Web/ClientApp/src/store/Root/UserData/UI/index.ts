import { reducerMapPage } from "./MapPage/"
import { defaultMapPageState, MapPageState } from "./MapPage"
import { reducerNavBar } from "./NavBar/NavBarReducer"
import { defaultNavBarState, NavBarState } from "./NavBar/NavBarState"

export interface UiState {
    navBar: NavBarState,
    mapPage: MapPageState
}

export const defaultUiState : UiState = {
    navBar: defaultNavBarState,
    mapPage: defaultMapPageState
}

export const uiReducers = 
[ 
    reducerNavBar, 
    ...reducerMapPage 
]