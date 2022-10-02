export enum enContentType {
    Domain = 1,
    Character = 2,
    Army = 3
}

export interface LeftCanvasState {
    isBusy: string | undefined,
    error: string | undefined,
    isOpen: boolean,
    contentType: enContentType,
    contentId: number | undefined
}

export const defaultLeftCanvasState : LeftCanvasState = {
    isBusy: undefined,
    error: undefined,
    isOpen: false,
    contentType: enContentType.Domain,
    contentId: 0
}