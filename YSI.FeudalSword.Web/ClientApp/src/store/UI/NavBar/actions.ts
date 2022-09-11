export interface ISetLoginMenu {
    type: 'SET_LOGIN_MENU',
    isAuthorizated: boolean,
    isLoading: boolean
}

export interface ISetErrorField {
    type: 'SET_ERROR_FIELD',
    show: boolean,
    message: string | undefined
}