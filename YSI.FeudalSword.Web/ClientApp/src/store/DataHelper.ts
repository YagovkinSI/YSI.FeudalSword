import { ApplicationState } from ".";
import * as RequestHelper from './RequestHelper'

export interface IResponse<T> {
    success: boolean,
    data: T | undefined,
    error: string | undefined
}

export const getCharacterIdByDomainId = async (appState: ApplicationState, domainId: number) 
: Promise<IResponse<number>> => {
    const titleId = domainId;
    const character = appState.characters == undefined
        ? undefined
        : appState.characters.characters
            .find(c => c.titles.find(t => t.id == titleId));
    if (character != undefined)
    {
        const characterId : IResponse<number> = {
            data: character.id,
            error: undefined,
            success: true
        }
        return  characterId;
    }
    else {
        const characterResponse = await RequestHelper.getByTitle(appState, titleId);
        const characterId : IResponse<number> = {
            data: characterResponse.data != undefined 
                ? characterResponse.data.id 
                : undefined,
            error: characterResponse.error,
            success: characterResponse.success
        }
        return  characterId;
    }
        
    
    

}