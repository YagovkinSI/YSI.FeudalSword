import { IPublicCharacter, IPublicDynasty, IPublicTitle, IPublicUser } from "../../../../../../../models/IPublicDataApiModel";
import { RootState } from "../../../../.."

export interface CharacterCardData {
    character: IPublicCharacter,
    titles: IPublicTitle[],
    dynasty: IPublicDynasty | undefined,
    user: IPublicUser | undefined
}

const checkDataForCharacter = (rootState : RootState, characterId : number) : CharacterCardData | undefined => {
    var character = rootState.publicData.characters.find(c => c.id == characterId);
    if (character == undefined || character.titlesIds == undefined)
        return undefined;

    const titlesIds = character.titlesIds;
    var titles = rootState.publicData.titles
        .filter(t => titlesIds.includes(t.id));
    if (titles.length != titlesIds.length)
        return undefined;

    const dynastyId = character.dynastyId;
    var dynasty = rootState.publicData.dynasties
        .find(d => d.id == dynastyId);
    if (dynastyId != undefined &&  dynasty == undefined)
        return undefined;

    const userId = character.userId;
    var user = rootState.publicData.users
        .find(u => u.id == userId);
    if (userId != undefined &&  user == undefined)
        return undefined;

    return { character, titles, dynasty, user };
}

export const characterCardHelper = { checkDataForCharacter }