import { AppThunkAction } from "../..";
import { enMapType } from "./enums";
import { showOwnerOfDomain } from "./Helpers/leftCanvasHelper";
import { MapPageAction } from "./reducer";

const onClickDomainOnMap = (domainId : number) 
: AppThunkAction<MapPageAction> => async (dispatch, getState) => { 
    const appState = getState();
    const mapType = appState.ui.mapPage.map.mapType;
    switch (mapType) {
        case enMapType.Main:
        default:
            showOwnerOfDomain(appState, dispatch, domainId);
            break;
    }
}

const hideLeftCanvas = () 
: AppThunkAction<MapPageAction> => async (dispatch, getState) => {
    dispatch({
        type: 'HIDE_LEFT_CANVAS' 
    })
}

export const mapPageActionCreators = { onClickDomainOnMap, hideLeftCanvas }

