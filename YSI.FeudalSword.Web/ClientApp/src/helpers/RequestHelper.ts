import axios, { AxiosError, AxiosResponse } from "axios";
import { ApplicationState } from "../store";
import { ICharacter } from "../models/ICharacter";
import * as Characters from "../store/Characters";
import GetErrorMessage from "./ServerErrorParserHepler";

export interface IServerResponse<T> {
    success: boolean,
    data: T,
    error: string
}

export const getByTitle = async (
    appState: ApplicationState,
    titleId: number
) : Promise<IServerResponse<ICharacter>> => {
    try {
        console.log('request Character/getByTitle');
        const response = await axios.get('Character/getByTitle', { params: { titleId } });
        console.log('response Character/getByTitle', response);
        const character = response.data as ICharacter;
        if (appState.characters == undefined)
            appState.characters = Characters.unloadedState;
        if (!appState.characters.characters.some(c => c.id == character.id))
            appState.characters.characters.push(character);
        return {
            success: true,
            data: character
        } as IServerResponse<ICharacter>
    } catch (error) {
        console.log('error Character/getByTitle', error);
            const message = GetErrorMessage(error as AxiosError);
            return {
                success: false,
                error: message
            } as IServerResponse<ICharacter>
    }
}