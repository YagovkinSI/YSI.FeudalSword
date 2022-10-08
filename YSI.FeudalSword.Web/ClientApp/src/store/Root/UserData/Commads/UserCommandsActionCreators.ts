import { AppThunkAction } from "../../..";
import { requestService } from "../../../RequestService/RequestService";
import { UserCommandsActions } from "./UserCommandsReducer";

const getUserCommands = ()
: AppThunkAction<UserCommandsActions> => async (dispatch, getState) => {
    const appState = getState();
    if (appState.root.userData.commands.isBusy)
        return;
    dispatch({ type: 'USER_DATA/COMMANDS/SET_BUSY' })
    const response = await requestService.commandsController.getUserCommands(appState);
    if (response.success) {
        const targetDomainId = response.data == undefined 
            ? undefined 
            : response.data.commands == undefined
                ? undefined
                : response.data.commands.length != 1
                    ? undefined
                    : response.data.commands[0].commandTargetId;
        dispatch({ type: 'USER_DATA/COMMANDS/SET_TARGET', targetDomainId });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'USER_DATA/COMMANDS/SET_ERROR', error });
    }
}

const setCommand = ( targetDomainId: number )
: AppThunkAction<UserCommandsActions> => async (dispatch, getState) => {
    const appState = getState();
    if (appState.root.userData.commands.isBusy)
        return;
    dispatch({ type: 'USER_DATA/COMMANDS/SET_BUSY' });
    const targetDomainIdNullable = targetDomainId == appState.root.userData.commands.targetDomainId
        ? undefined
        : targetDomainId
    const response = await requestService.commandsController.set(appState, targetDomainIdNullable);
    if (response.success) {
        dispatch({
            type: 'USER_DATA/COMMANDS/SET_TARGET',
            targetDomainId: targetDomainIdNullable
        })
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'USER_DATA/COMMANDS/SET_ERROR', error });
    }
}

export const userCommandsActionCreators = { getUserCommands, setCommand };