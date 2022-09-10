import { IUiState } from "../ui";
import { IHideLeftCanvas, ISetMapType, IShowLeftCanvas } from "./actions";

export type MapPageAction = IShowLeftCanvas | IHideLeftCanvas | ISetMapType;

export const reducerMapPage = (state : IUiState, action : MapPageAction) : IUiState => 
{
    switch (action.type) {  
        case 'SET_MAP_TYPE':
            return {
                ...state,
                mapPage: {
                    ...state.mapPage,
                    map: {
                        ...state.mapPage.map,
                        mapType: action.mapType
                    }
                }
            }
        case 'SHOW_LEFT_CANVAS':
            return {
                ...state,
                mapPage: {
                    ...state.mapPage,
                    leftCanvas: {
                        ...state.mapPage.leftCanvas,
                        show: true,
                        isLoading: action.isLoading,
                        error: action.error,
                        contentId: action.contentId,
                        contentType: action.contentType
                    }
                }
            }
        case 'HIDE_LEFT_CANVAS':
            return {
                ...state,
                mapPage: {
                    ...state.mapPage,
                    leftCanvas: {
                        ...state.mapPage.leftCanvas,
                        show: false
                    }
                }
            }
        default:
            return state;             
    }
}