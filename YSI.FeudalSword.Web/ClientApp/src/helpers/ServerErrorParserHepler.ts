import { AxiosError } from 'axios';

interface IResponseData {
    errors: any,
    status: number,
    title: string,
    type: string
}

const GetErrorMessage = (error: AxiosError): string  => {
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

export default GetErrorMessage