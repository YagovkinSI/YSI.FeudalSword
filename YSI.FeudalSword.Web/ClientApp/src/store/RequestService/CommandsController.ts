import axios, { AxiosError } from "axios";
import { ApplicationState } from "..";
import { GetErrorMessage, IResponse } from "./RequestService";

const set = async (appState: ApplicationState, commandTargetId: number | undefined)
: Promise<IResponse<number | undefined>> => {
    try {
        console.log('request Command/set');
        const commandType = 10;
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

export const commandsController = { set };