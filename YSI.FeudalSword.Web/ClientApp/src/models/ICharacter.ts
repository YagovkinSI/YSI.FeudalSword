import { ITitleShort } from "./ITitleShort";

export interface ICharacter {
    id : number;
    name: string;
    dynastyId: number | undefined;
    userId: string | undefined;
    suzerainId: number | undefined;
    
    dynastyName: string | undefined;
    userName: string | undefined;
    userLastActivity: Date | undefined;
    titles: ITitleShort[];
}