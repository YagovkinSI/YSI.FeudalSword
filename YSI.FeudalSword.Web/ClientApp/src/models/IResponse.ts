export interface IResponse<T> {
    success: boolean,
    data: T | undefined,
    error: string | undefined
}