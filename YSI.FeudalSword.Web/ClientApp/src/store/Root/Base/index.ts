
export interface IBaseState<T> {
    baseState: BaseState,
    data: T
}

export const getDefaultBaseState = (defaultData: any) : IBaseState<any> => {
    return {
        baseState: defaultBaseState,
        data: defaultData
    }
}

export interface BaseState {
    isBusy: string | undefined,
    error: string | undefined,
    isChecked : boolean
}

export const defaultBaseState = {
    isBusy: undefined,
    error: undefined,
    isChecked : false
}

export const baseStateSetData = (baseState : BaseState, requestId : string) 
: BaseState => {
    return {
        ...baseState,
        isChecked: true,
        isBusy: baseState.isBusy == requestId
            ? undefined
            : baseState.isBusy,
        error: undefined
    }
}

export const baseStateSetBusy = (baseState : BaseState, requestId : string) 
: BaseState => {
    return {
        ...baseState,
        isBusy: requestId
    }
}

export const baseStateSetError = (error : string) 
: BaseState => {
    return {
        isChecked: true,
        isBusy: undefined,
        error
    }
}

export interface BaseSetData<T1, T2> {
    type: T1,
    data: T2
    requestId: string
}

export interface BaseSetBusy<T> {
    type: T
    requestId: string
}

export interface BaseSetError<T> {
    type: T
    error: string
}

export const baseSetBusy = (localState : IBaseState<any>, action : BaseSetBusy<'USER_DATA/COMMANDS/SET_BUSY'>)
: IBaseState<any> => {
    return {
        ...localState,
        baseState: baseStateSetBusy(localState.baseState, action.requestId)
    }
}

export const baseSetError = (localState : IBaseState<any>, 
    action : BaseSetError<'USER_DATA/COMMANDS/SET_ERROR'>)
: IBaseState<any> => {
    return {
        ...localState,
        baseState: baseStateSetError(action.error)
    }
}

export const baseSetData = (localState : IBaseState<any>, 
    action : BaseSetData<'USER_DATA/COMMANDS/SET_TARGET', any>)
: IBaseState<any> => {
    return {
        ...localState,
        data: action.data,
        baseState: baseStateSetData(localState.baseState, action.requestId)
    }
}