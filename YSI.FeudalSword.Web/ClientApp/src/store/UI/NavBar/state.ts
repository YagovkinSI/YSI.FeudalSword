export interface INavBarState {
    loginMenu: ILoginMenuState,
    errorField: IErrorField
}

export interface ILoginMenuState {
    isAuthorizated: boolean,
    isLoading: boolean
}

export interface IErrorField {
    show: boolean,
    message: string | undefined
}





