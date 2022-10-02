import { AppThunkAction } from "../../..";
import { CurrentTurnActions } from "./CurrentTurnReducer";
import { requestService } from "../../../RequestService/RequestService";
import { ICurrentTurn } from "../../../../models/ICurrentTurn";

const getCurrentTurn = () 
: AppThunkAction<CurrentTurnActions> => async (dispatch, getState) => {
    const appState = getState();
    if (appState.root.publicData.currentTurn.isBusy)
        return;
    dispatch({ type: 'PUBLIC_DATA/CURRENT_TURN/SET_BUSY'});
    const response = await requestService.turnController.getCurrentTurn(appState);
    if (response.success) {
        const currentTurn = response.data as ICurrentTurn ;
        dispatch({ type: 'PUBLIC_DATA/CURRENT_TURN/SET_CURRENT_TURN', currentTurn });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'PUBLIC_DATA/CURRENT_TURN/SET_ERROR', error });
    }
}

export const currentTurnActionCreators = { getCurrentTurn }