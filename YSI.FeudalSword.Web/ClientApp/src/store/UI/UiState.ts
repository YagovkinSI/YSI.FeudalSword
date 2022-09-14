import { defaultNavBarState, NavBarState } from "./NavBar/NavBarState"

export interface UiState {
    navBar: NavBarState
}

export const defaultUiState : UiState = {
    navBar: defaultNavBarState
}