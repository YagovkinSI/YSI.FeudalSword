import { Action } from "redux";
import { RootState } from "../Root";
import { reducerMapPage } from "./MapPage/MapPageReducer";
import { NavBarActions, reducerNavBar } from "./NavBar/NavBarReducer";

export const reducerUi = (state : RootState, action : Action) 
: RootState | undefined => 
{
    let newState = reducerNavBar(state, action as NavBarActions);
    if (newState != undefined)
        return newState;

    newState = reducerMapPage(state, action);
    if (newState != undefined)
        return newState;

    return undefined;
}