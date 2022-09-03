import { ICharacter } from "./ICharacter";

export interface ICheckMyCharacter {
    hasCharacter: boolean;
    character: ICharacter | undefined;
}