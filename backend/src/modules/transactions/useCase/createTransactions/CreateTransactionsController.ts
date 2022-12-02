import { Request, Response } from "express";
import { CreateTransactionsUseCase } from "./CreateTransactionsUseCase";

export class CreateTransactionController {

  async handle(request: Request, response: Response) {
    const { cpf, value, cpfClientAccount } = request.body


    const createTransactionsUseCase = new CreateTransactionsUseCase()

    const result = await createTransactionsUseCase.execute({ cpf, value, cpfClientAccount })

    return response.status(200).json(result)
  }
}