import axios, { AxiosError } from "axios";
import { ApplicationState } from "..";
import { ICurrentTurn } from "../../models/ICurrentTurn";
import { GetErrorMessage, IResponse } from "./RequestService";

export const getCurrentTurn = async (appState: ApplicationState)
: Promise<IResponse<ICurrentTurn>> => {
    const requestName = 'Turn/getCurrentTurn';
    try {
        console.log(`request ${requestName}`);
        const response = await axios.get(requestName);
        console.log(`response ${requestName}`, response);        
            return {
                data: response.data,
                error: undefined,
                success: true
            } as IResponse<ICurrentTurn>      
    } catch (error) {
        console.log(`error ${requestName}`, error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<ICurrentTurn>
    }
}

export const turnController = { getCurrentTurn };