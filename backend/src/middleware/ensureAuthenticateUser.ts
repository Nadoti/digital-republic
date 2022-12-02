import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateUser(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    //401 erro de autorização
    return response.status(401).json({
      message: "token missing"
    })
  }

  // Baerer
  //[0] - Baerer
  //[1] - 943457348-57384578345
  const [, token] = authHeader.split(" ")

  try {
    const { sub } = verify(token, "019acc25a4e242bb55ad489832ada12d") as IPayload

    request.id = sub


    return next()

  } catch (err) {
    return response.status(401).json({
      message: "Invalid token!"
    })
  }

}