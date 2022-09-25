import { IPublicArmy, IPublicCharacter, IPublicDataApiModel, IPublicDomain, IPublicDynasty, IPublicTitle, IPublicUnit, ISaga } from "../../models/IPublicDataApiModel"
import { RootState } from "../Root";

const reset = (appState : RootState, saga : ISaga) => {
    //TODO
}

const updateDomains = (appState : RootState, array : IPublicDomain[]) => {
    array.forEach(item => {
        let currentItem = appState.publicData.domains.find(i => i.id == item.id);
        if (currentItem == undefined) {
            appState.publicData.domains.push(item)
        } else {
            if (item.armiesHereIds != undefined)
                currentItem.armiesHereIds = item.armiesHereIds;
            if (item.titlesIds != undefined)
                currentItem.titlesIds = item.titlesIds;
        }
    });
}

const updateTitles = (appState : RootState, array : IPublicTitle[]) => {
    array.forEach(item => {
        let currentItem = appState.publicData.titles.find(i => i.id == item.id);
        if (currentItem == undefined) {
            appState.publicData.titles.push(item)
        } else {
            if (item.jureVassalsIds != undefined)
                currentItem.jureVassalsIds = item.jureVassalsIds;
        }
    });
}

const updateArmies = (appState : RootState, array : IPublicArmy[]) => {
    array.forEach(item => {
        let currentItem = appState.publicData.armies.find(i => i.id == item.id);
        if (currentItem == undefined) {
            appState.publicData.armies.push(item)
        } else {
            if (item.unitIds != undefined)
                currentItem.unitIds = item.unitIds;
        }
    });
}

const updateCharacters = (appState : RootState, array : IPublicCharacter[]) => {
    array.forEach(item => {
        let currentItem = appState.publicData.characters.find(i => i.id == item.id);
        if (currentItem == undefined) {
            appState.publicData.characters.push(item)
        } else {
            if (item.armiesIds != undefined)
                currentItem.armiesIds = item.armiesIds;
            if (item.titlesIds != undefined)
                currentItem.titlesIds = item.titlesIds;
            if (item.unitsIds != undefined)
                currentItem.unitsIds = item.unitsIds;
            if (item.vassalsIds != undefined)
                currentItem.vassalsIds = item.vassalsIds;
        }
    });
}

const updateDynasties = (appState : RootState, array : IPublicDynasty[]) => {
    array.forEach(item => {
        let currentItem = appState.publicData.dynasties.find(i => i.id == item.id);
        if (currentItem == undefined) {
            appState.publicData.dynasties.push(item)
        } else {
            if (item.charactersIds != undefined)
                currentItem.charactersIds = item.charactersIds;
        }
    });
}

const updateUnits = (appState : RootState, array : IPublicUnit[]) => {
    array.forEach(item => {
        let currentItem = appState.publicData.units.find(i => i.id == item.id);
        if (currentItem == undefined) {
            appState.publicData.units.push(item)
        }
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
    if (publicData.characters != undefined)
        updateCharacters(appState, publicData.characters)
    if (publicData.dynasties != undefined)
        updateDynasties(appState, publicData.dynasties)
    if (publicData.units != undefined)
        updateUnits(appState, publicData.units)
}


export const publicDataHelper = { update }