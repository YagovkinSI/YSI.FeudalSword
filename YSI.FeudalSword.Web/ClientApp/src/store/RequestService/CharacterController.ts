import axios, { AxiosError } from "axios";
import { ApplicationState } from "..";
import { ICheckMyCharacter } from "../../models/ICheckMyCharacter";
import { IPublicDataApiModel } from "../../models/IPublicDataApiModel";
import { publicDataActionCreators } from "../PublicData/PublicDataActionCreators";
import { GetErrorMessage, IResponse } from "./RequestService";

export const get = async (appState: ApplicationState, characterId : number)
: Promise<IResponse<IPublicDataApiModel>> => {
    const requestName = 'Character/get';
    try {
        console.log(`request ${requestName}`);
        const response = await axios.get(requestName, { params: { characterId } });
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

const getUserCharacter = async (appState: ApplicationState)
: Promise<IResponse<ICheckMyCharacter>> => {
    try {
        console.log('request Character/getMyCharacter');
        const response = await axios.get('Character/getMyCharacter');
        console.log('response Character/getMyCharacter', response);
        return {
            data: response.data,
            error: undefined,
            success: true
        } as IResponse<ICheckMyCharacter>
    } catch (error) {
        console.log('error Character/getMyCharacter', error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<ICheckMyCharacter>
    }
}

const takeCharacter = async (appState: ApplicationState, characterId: number)
: Promise<IResponse<number>> => {
    try {
        console.log('request Character/takeControl');
        const response = await axios.get('Character/takeControl', { params: { characterId } });
        console.log('response Character/takeControl', response);
        return {
            data: characterId,
            error: undefined,
            success: true
        } as IResponse<number>
    } catch (error) {
        console.log('error Character/takeControl', error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<number>
    }
}

export const characterController = { get, getUserCharacter, takeCharacter };