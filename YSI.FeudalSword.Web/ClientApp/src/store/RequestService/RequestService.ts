import { AxiosError } from "axios";
import { characterController } from "./CharacterController";
import { domainController } from "./DomainController";
import { turnController } from "./TurnController";
import { userController } from "./UserController";

export const requestService = { userController, turnController, domainController, characterController };

export interface IResponse<T> {
    data: T | undefined,
    error: string | undefined,
    success: boolean
}

interface IResponseData {
    errors: any,
    status: number,
    title: string,
    type: string
}

export const GetErrorMessage = (error: AxiosError): string  => {
    console.log('error', error);
    if (error.response == undefined || error.response.data == undefined)
        return "Произошла неизвестная ошибка."
    
    if (typeof(error.response.data) == 'string')
        return error.response.data + "."
 
    const data = error.response.data as IResponseData;
    if (data == undefined || data.errors == undefined)
        return "Произошла неизвестная ошибка."
    
    let result = ''
    for (var key in data.errors) {
        let array = data.errors[key] as string[]
        if (array != undefined)
            array.forEach(e => result += e + ". ") 
    }
    
    return result === ''
        ? "Произошла неизвестная ошибка."
        : result;
}