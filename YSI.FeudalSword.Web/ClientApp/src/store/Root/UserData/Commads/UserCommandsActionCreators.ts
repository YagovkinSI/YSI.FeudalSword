import { AppThunkAction } from "../../..";
import { requestService } from "../../../RequestService/RequestService";
import { UserCommandsActions } from "./UserCommandsReducer";

const setCommand = ( targetDomainId: number )
: AppThunkAction<UserCommandsActions> => async (dispatch, getState) => {
    const appState = getState();
    dispatch({
        type: 'USER_DATA/COMMANDS/SET_TARGET',
        targetDomainId: targetDomainId == appState.root.userData.commands.targetDomainId
            ? undefined
            : targetDomainId
    })
}

export const userCommandsActionCreators = { setCommand };