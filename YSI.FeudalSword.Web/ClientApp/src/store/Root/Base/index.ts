
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