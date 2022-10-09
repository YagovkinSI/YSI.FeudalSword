import { AppThunkAction } from "../../..";
import { requestService } from "../../../RequestService/RequestService";
import { UserCommandsActions } from "./UserCommandsReducer";

const getUserCommands = ()
: AppThunkAction<UserCommandsActions> => async (dispatch, getState) => {
    const appState = getState();
    const requestId = 'getUserCommands';
    if (appState.root.userData.commands.baseState.isBusy == requestId)
        return;
    dispatch({ type: 'USER_DATA/COMMANDS/SET_BUSY', requestId })
    const response = await requestService.commandsController.getUserCommands(appState);
    if (response.success) {
        const targetDomainId = response.data == undefined 
            ? undefined 
            : response.data.commands == undefined
                ? undefined
                : response.data.commands.length != 1
                    ? undefined
                    : response.data.commands[0].commandTargetId;
        dispatch({ type: 'USER_DATA/COMMANDS/SET_TARGET', data: targetDomainId, requestId });
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'USER_DATA/COMMANDS/SET_ERROR', error });
    }
}

const setCommand = ( targetDomainId: number )
: AppThunkAction<UserCommandsActions> => async (dispatch, getState) => {
    const appState = getState();
    const requestId = `setCommand_${targetDomainId}`;
    if (appState.root.userData.commands.baseState.isBusy == requestId)
        return;
    dispatch({ type: 'USER_DATA/COMMANDS/SET_BUSY', requestId });
    const targetDomainIdNullable = targetDomainId == appState.root.userData.commands.targetDomainId
        ? undefined
        : targetDomainId
    const response = await requestService.commandsController.set(appState, targetDomainIdNullable);
    if (response.success) {
        dispatch({
            type: 'USER_DATA/COMMANDS/SET_TARGET',
            data: targetDomainIdNullable,
            requestId         
        })
    } else {
        const error = response.error == undefined ? 'Неизвестная ошибка' : response.error;
        dispatch({ type: 'USER_DATA/COMMANDS/SET_ERROR', error });
    }
}

export const userCommandsActionCreators = { getUserCommands, setCommand };