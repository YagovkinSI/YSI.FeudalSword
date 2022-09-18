import { Action } from "redux";
import { RootState } from "../Root";
import { NavBarActions, reducerNavBar } from "./NavBar/NavBarReducer";

export const reducerUi = (state : RootState, action : Action) 
: RootState | undefined => 
{
    let newState = reducerNavBar(state, action as NavBarActions);
    if (newState != undefined)
        return newState;

    return undefined;
}