export interface IPublicDataApiModel {
    saga : ISaga,
    armies : IPublicArmy[] | undefined,
    units : IPublicUnit[] | undefined,
    domains : IPublicDomain[] | undefined,
    users: IPublicUser[] | undefined,
    titles : IPublicTitle[] | undefined,
    characters : IPublicCharacter[] | undefined,
    dynasties : IPublicDynasty[] | undefined
}

export interface ISaga {
    gameVersion : string,
    turnNumber: number,
    serverDateTime : Date
}

export interface IPublicArmy {
    id : number,
    commanderId : number,
    locationId : number,
    unitIds : number[] | undefined
}

export interface IPublicUnit {
    id : number,
    type : enUnitType,
    countAbout : number,
    armyId : number,
    ownerId : number
}

export enum enUnitType {
    Commoners = 0,
    Swordsman = 10,
    Rider = 20,
    Pikeman = 30,
    Archer = 40,
    EliteWarrior = 100
}

export interface IPublicDomain {
    id : number,
    titlesIds : number[] | undefined,
    armiesHereIds : number[] | undefined
}

export interface IPublicUser {
    id : string,
    userName : string,
    created : Date,
    lastActivity : Date,
    charactersIds: number[] | undefined
}

export interface IPublicTitle {
    id : number,
    name : string,
    rank : enTitleRank,
    ownerId : number | undefined,
    capitalId : number,
    jureSuzerainId : number | undefined,
    jureVassalsIds: number[] | undefined
}

export enum enTitleRank {
    Earl = 1,
    Duke = 2,
    King = 3,
    Emperor = 4
}

export interface IPublicCharacter {
    id : number,
    name : string,
    warriorCount: number,
    dynastyId : number | undefined,
    userId : string | undefined,
    suzerainId : number | undefined,
    vassalsIds: number[] | undefined,
    titlesIds: number[] | undefined,
    unitsIds: number[] | undefined,
    armiesIds: number[] | undefined
}

export interface IPublicDynasty {
    id : number,
    name : string,
    charactersIds: number[] | undefined
}

