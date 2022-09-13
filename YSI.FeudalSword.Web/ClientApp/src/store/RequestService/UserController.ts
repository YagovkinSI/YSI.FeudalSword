import axios, { AxiosError, AxiosResponse } from "axios";
import { ApplicationState } from "..";
import { ICheckAuthResponse } from "../../models/ICheckAuthResponse";
import { ICurrentUser } from "../../models/ICurrentUser";
import { GetErrorMessage, IResponse } from "./RequestService";

export const getCurrentUser = async (
    appState: ApplicationState
) : Promise<IResponse<ICheckAuthResponse>> => {
    try {
        console.log('request User/currentUser');
        const response = await axios.get('User/currentUser');
        console.log('response User/currentUser', response);
        return {
            data: response.data,
            error: undefined,
            success: true
        } as IResponse<ICheckAuthResponse>
    } catch (error) {
        console.log('error User/currentUser', error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<ICheckAuthResponse>
    }
}

export const register = async (appState: ApplicationState, 
    userName: string, password: string, passwordConfirm: string)
: Promise<IResponse<ICurrentUser>> => {
    try {
        console.log('request User/register');
        const response = await axios.post('User/register', { userName, password, passwordConfirm });
        console.log('response User/register', response);       
        return {
            data: response.data,
            error: undefined,
            success: true
        } as IResponse<ICurrentUser>
    } catch (error) {
        console.log('error User/register', error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<ICurrentUser>
    }
}

export const login = async (appState: ApplicationState, 
    userName: string, password: string)
: Promise<IResponse<ICurrentUser>> => {
    try {
        console.log('request User/login');
        const response = await axios.post('User/login', { userName, password });
        console.log('response User/login', response);       
        return {
            data: response.data,
            error: undefined,
            success: true
        } as IResponse<ICurrentUser>
    } catch (error) {
        console.log('error User/login', error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<ICurrentUser>
    }
}

export const logout = async (appState: ApplicationState)
: Promise<IResponse<boolean>> => {
    try {
        console.log('request User/logout');
        const response = await axios.post('User/logout');
        console.log('response User/logout', response);        
            return {
                data: response.data,
                error: undefined,
                success: true
            } as IResponse<boolean>      
    } catch (error) {
        console.log('error User/logout', error);
        const message = GetErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: message,
            success: false
        } as IResponse<boolean>
    }
}

export const userController = { getCurrentUser, register, login, logout };