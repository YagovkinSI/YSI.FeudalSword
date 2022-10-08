import axios, { AxiosError } from "axios";
import { ApplicationState } from "..";
import { ICheckMyCommands } from "../../models/ICheckMyCommands";
import { GetErrorMessage, IResponse } from "./RequestService";

const getUserCommands = async (appState: ApplicationState)
: Promise<IResponse<ICheckMyCommands>> => {
    try {
        console.log('request Command/getMyCommands');
        const response = await axios.get('Command/getMyCommands');
        console.log('response Command/getMyCommands', response);
        return {
            data: response.data,
            error: undefined,
            success: true
        } as IResponse<ICheckMyCommands>
    } catch (error) {
        console.log('error Command/getMyCommands', error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<ICheckMyCommands>
    }
}

const set = async (appState: ApplicationState, commandTargetId: number | undefined)
: Promise<IResponse<number | undefined>> => {
    try {
        console.log('request Command/set');
        const commandType = commandTargetId == undefined
            ? 0
            : 10;
        const response = await axios.get('Command/set', { params: { commandType, commandTargetId } });
        console.log('response Command/set', response);
        return {
            data: commandTargetId,
            error: undefined,
            success: true
        } as IResponse<number | undefined>
    } catch (error) {
        console.log('error Command/set', error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<number | undefined>
    }
}

export const commandsController = { getUserCommands, set };