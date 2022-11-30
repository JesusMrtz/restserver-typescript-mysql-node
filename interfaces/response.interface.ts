export interface ResponseInterface {
    ok: boolean;
    status: number;
    message?: string;
    code?: number
    error?: (null | object | Array<[]>)
}