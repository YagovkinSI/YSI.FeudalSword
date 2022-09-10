import { enLeftCanvasContentType, enMapType } from "./enums"

export interface IMapPageState {
    map: IMapState,
    leftCanvas: ILeftCanvasState
}

export interface IMapState {
    mapType: enMapType
}

export interface ILeftCanvasState {
    show: boolean,
    isLoading: boolean,
    error: string | undefined,
    contentType: enLeftCanvasContentType,
    contentId: number | undefined
}





