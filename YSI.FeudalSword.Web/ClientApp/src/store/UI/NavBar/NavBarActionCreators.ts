import { AppThunkAction } from "../..";
import { NavBarActions } from "./NavBarReducer";

const closeNavBarMenu = ()
: AppThunkAction<NavBarActions> => async (dispatch, getState) => {
    dispatch({ type: 'CLOSE' })
}

const toggleNavBar = ()
: AppThunkAction<NavBarActions> => async (dispatch, getState) => {
    dispatch({ type: 'TOGGLE' })
}

export const navBarActionCreators = { closeNavBarMenu, toggleNavBar };