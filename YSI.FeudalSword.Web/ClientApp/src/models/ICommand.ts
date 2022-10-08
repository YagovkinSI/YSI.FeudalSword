export enum enCommandType {    
    WarrioirGathering = 0,
    CapturingDomain = 10
}

export interface ICommand {
    id: number,
    characterId: number,
    commandType: enCommandType,
    commandTargetId: number
}