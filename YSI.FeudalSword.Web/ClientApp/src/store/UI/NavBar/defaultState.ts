import { IErrorField, ILoginMenuState, INavBarState } from "./state"

const defaultLoginMenu : ILoginMenuState = {
    isAuthorizated: false,
    isLoading: true
}

export const defaultErrorField : IErrorField = {
    show: false,
    message: undefined
}

export const defaultNavBar : INavBarState = {
    loginMenu: defaultLoginMenu,
    errorField: defaultErrorField
}