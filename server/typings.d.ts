import { Request, Response } from "express"

export interface userInputData {
    name: string,
    username: string,
    email: string,
    password: string
}

export interface queryResponse<T>{
    error?: string,
    data?: T
}

export interface MyCtx{
    req: Request,
    res: Response
}