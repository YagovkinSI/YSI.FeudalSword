import { defaultLeftCanvasState, LeftCanvasState } from "./LeftCanvas/LeftCanvasState"

export interface MapPageState {
    leftCanvas: LeftCanvasState
}

export const defaultMapPageState : MapPageState = {
    leftCanvas: defaultLeftCanvasState
}