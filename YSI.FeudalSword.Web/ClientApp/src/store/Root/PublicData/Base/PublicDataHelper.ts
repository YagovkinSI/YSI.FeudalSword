import { RootState } from "../..";
import * as ApiModel from "../../../../models/IPublicDataApiModel";

const reset = (appState : RootState, saga : ApiModel.ISaga) => {
    //TODO
}

const updateDomains = (appState : RootState, array : ApiModel.IPublicDomain[]) => {
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

const updateTitles = (appState : RootState, array : ApiModel.IPublicTitle[]) => {
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

const updateArmies = (appState : RootState, array : ApiModel.IPublicArmy[]) => {
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

const updateCharacters = (appState : RootState, array : ApiModel.IPublicCharacter[]) => {
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

const updateDynasties = (appState : RootState, array : ApiModel.IPublicDynasty[]) => {
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

const updateUnits = (appState : RootState, array : ApiModel.IPublicUnit[]) => {
    array.forEach(item => {
        let currentItem = appState.publicData.units.find(i => i.id == item.id);
        if (currentItem == undefined) {
            appState.publicData.units.push(item)
        }
    });
}

const updateUsers = (appState : RootState, array : ApiModel.IPublicUser[]) => {
    array.forEach(item => {
        let currentItem = appState.publicData.users.find(i => i.id == item.id);
        if (currentItem == undefined) {
            appState.publicData.users.push(item)
        } else {
            if (item.charactersIds != undefined)
                currentItem.charactersIds = item.charactersIds;
        }
    });
}

const update = (appState : RootState, publicData : ApiModel.IPublicDataApiModel) => {
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
    if (publicData.users != undefined)
        updateUsers(appState, publicData.users)
}


export const publicDataHelper = { update }