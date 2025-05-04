export interface ISuccessResponse<T> {
    messsage: string;
    data: T
}

export interface IResponseError {
    error: string
}