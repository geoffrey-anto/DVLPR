import { Request, Response } from "express";

export interface userInputData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface queryResponse<T> {
  error?: string;
  data?: T;
}

export interface MyCtx {
  req: Request;
  res: Response;
}

export interface tokenResponse {
  user_Id: number;
  user_UserName: string;
  user_Name: string;
  user_Email: string;
  iat: number;
  exp: number;
}