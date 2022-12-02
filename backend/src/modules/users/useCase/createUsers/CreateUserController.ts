import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";




export class CreateUserController {

  async handle(request: Request, response: Response) {
    const { username, cpf } = request.body

    const createUserUseCase = new CreateUserUseCase()

    const result = await createUserUseCase.execute({
      username,
      cpf
    })

    return response.status(200).json(result)
  }
}