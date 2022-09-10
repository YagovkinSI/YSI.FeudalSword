import { enLeftCanvasContentType, enMapType } from "./enums"

export interface ISetMapType {
    type: 'SET_MAP_TYPE',
    mapType: enMapType
}

export interface IShowLeftCanvas {
    type: 'SHOW_LEFT_CANVAS',
    contentType: enLeftCanvasContentType,
    contentId: number | undefined,
    isLoading: boolean,
    error: string | undefined
}

export interface IHideLeftCanvas {
    type: 'HIDE_LEFT_CANVAS'
}

