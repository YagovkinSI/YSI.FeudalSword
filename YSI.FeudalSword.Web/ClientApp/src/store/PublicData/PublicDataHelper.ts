import { IPublicArmy, IPublicDataApiModel, IPublicDomain, IPublicTitle, ISaga } from "../../models/IPublicDataApiModel"
import { RootState } from "../Root";

const reset = (appState : RootState, saga : ISaga) => {
    //TODO
}

const updateDomains = (appState : RootState, array : IPublicDomain[]) => {
    array.forEach(item => {
        if (!appState.publicData.domains.some(i => i.id == item.id))
            appState.publicData.domains.push(item)
    });
}

const updateTitles = (appState : RootState, array : IPublicTitle[]) => {
    array.forEach(item => {
        if (!appState.publicData.titles.some(i => i.id == item.id))
            appState.publicData.titles.push(item)
    });
}

const updateArmies = (appState : RootState, array : IPublicArmy[]) => {
    array.forEach(item => {
        if (!appState.publicData.armies.some(i => i.id == item.id))
            appState.publicData.armies.push(item)
    });
}

const update = (appState : RootState, publicData : IPublicDataApiModel) => {
    if (appState.publicData.currentTurn.id != publicData.saga.turnNumber)
        reset(appState, publicData.saga);
    if (publicData.domains != undefined)
        updateDomains(appState, publicData.domains)
    if (publicData.titles != undefined)
        updateTitles(appState, publicData.titles)
    if (publicData.armies != undefined)
        updateArmies(appState, publicData.armies)
}


export const publicDataHelper = { update }