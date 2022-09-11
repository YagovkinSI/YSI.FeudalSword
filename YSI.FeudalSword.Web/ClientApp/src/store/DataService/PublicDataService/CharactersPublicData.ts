import { ApplicationState } from "../..";
import { IResponse } from "../../../models/IResponse";
import * as RequestHelper from '../../RequsetService/Controllers/Character'

const getCharacterIdByDomainId = async (appState: ApplicationState, domainId: number) 
: Promise<IResponse<number>> => {
    const titleId = domainId;
    const character = appState.characters == undefined
        ? undefined
        : appState.characters.characters
            .find(c => c.titles.find(t => t.id == titleId));
    if (character != undefined)    
        return {
            data: character.id,
            error: undefined,
            success: true
        } as IResponse<number>    
    else {
        const characterResponse = await RequestHelper.getByTitle(appState, titleId);
        return {
            data: characterResponse.data != undefined 
                ? characterResponse.data.id 
                : undefined,
            error: characterResponse.error,
            success: characterResponse.success
        } as IResponse<number>
    }
}

export const CharactersPublicData = { getCharacterIdByDomainId }