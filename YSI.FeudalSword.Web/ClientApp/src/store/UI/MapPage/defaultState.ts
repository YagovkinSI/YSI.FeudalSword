import { enLeftCanvasContentType, enMapType } from "./enums"
import { ILeftCanvasState, IMapPageState, IMapState } from "./state"

const defaultMap : IMapState = {
    mapType: enMapType.Main
}

const defaultLeftCanvas : ILeftCanvasState = {
    show: false,
    isLoading: false,
    error: undefined,
    contentId: 0,
    contentType: enLeftCanvasContentType.None
}

export const defaultMapPage : IMapPageState = {
    map: defaultMap,
    leftCanvas: defaultLeftCanvas
}