import { IPublicArmy, IPublicDomain, IPublicTitle } from "../../../../../../models/IPublicDataApiModel";
import { RootState } from "../../../../../Root"

export interface DomainCardData {
    domain: IPublicDomain,
    titles: IPublicTitle[],
    armiesHere: IPublicArmy[]
}

const checkDataForDomain = (rootState : RootState, domainId : number) : DomainCardData | undefined => {
    var domain = rootState.publicData.domains.find(d => d.id == domainId);
    if (domain == undefined || domain.titlesIds == undefined || domain.armiesHereIds == undefined)
        return undefined;
    const titlesIds = domain.titlesIds;
    var titles = rootState.publicData.titles
            .filter(t => titlesIds.includes(t.id));
    if (titles.length != titlesIds.length)
        return undefined;
    const armiesHereIds = domain.armiesHereIds;
    var armiesHere = rootState.publicData.armies
            .filter(t => armiesHereIds.includes(t.id));
    if (armiesHere.length != armiesHereIds.length)
        return undefined;
    return { domain, titles, armiesHere };
}

export const domainCardHelper = { checkDataForDomain }