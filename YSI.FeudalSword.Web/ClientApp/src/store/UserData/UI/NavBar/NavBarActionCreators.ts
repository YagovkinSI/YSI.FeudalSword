import { AppThunkAction } from "../../..";
import { NavBarActions } from "./NavBarReducer";

const closeNavBarMenu = ()
: AppThunkAction<NavBarActions> => async (dispatch, getState) => {
    dispatch({ type: 'UI/NAVBAR/CLOSE' })
}

const toggleNavBar = ()
: AppThunkAction<NavBarActions> => async (dispatch, getState) => {
    dispatch({ type: 'UI/NAVBAR/TOGGLE' })
}

export const navBarActionCreators = { closeNavBarMenu, toggleNavBar };