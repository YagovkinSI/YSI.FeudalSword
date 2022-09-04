import { ApplicationState } from "../store";


export const getCharacterIdByDomainId = (appState: ApplicationState, domainId: number) => {
    const titleId = domainId;
    const character = appState.characters == undefined
        ? undefined
        : appState.characters.characters
            .find(c => c.titles.find(t => t.id == domainId));
    const characterId = character == undefined
        ? undefined
        : character.id;
    return characterId;
}