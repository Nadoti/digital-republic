import { Request, Response } from 'express'
import { TakeAllTransactionsUseCase } from './TakeAllTransactionsUseCase'

export class TakeAllTransactionsController {
  async handle(request: Request, response: Response) {
    const { cpf, query, operation } = request.body

    const takeAllTransactionsUseCase = new TakeAllTransactionsUseCase()

    const result = await takeAllTransactionsUseCase.execute({ cpf, query, operation })

    return response.status(201).json(result)
  }
}