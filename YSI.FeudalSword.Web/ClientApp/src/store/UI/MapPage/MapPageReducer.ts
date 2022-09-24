import { Action } from "redux";
import { RootState } from "../../Root";
import { LeftCanvasActions, reducerLeftCanvas } from "./LeftCanvas/LeftCanvasReducer";

export const reducerMapPage = (state : RootState, action : Action) 
: RootState | undefined => 
{
    let newState = reducerLeftCanvas(state, action as LeftCanvasActions);
    if (newState != undefined)
        return newState;
        
    return undefined;  
}