import axios, { AxiosError } from "axios";
import { ApplicationState } from "..";
import { IPublicDataApiModel } from "../../models/IPublicDataApiModel";
import { GetErrorMessage, IResponse } from "./RequestService";

export const get = async (appState: ApplicationState, armyId : number)
: Promise<IResponse<IPublicDataApiModel>> => {
    const requestName = 'Army/get';
    try {
        console.log(`request ${requestName}`);
        const response = await axios.get(requestName, { params: { armyId } });
        console.log(`response ${requestName}`, response);        
            return {
                data: response.data,
                error: undefined,
                success: true
            } as IResponse<IPublicDataApiModel>      
    } catch (error) {
        console.log(`error ${requestName}`, error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<IPublicDataApiModel>
    }
}

export const armyController = { get };