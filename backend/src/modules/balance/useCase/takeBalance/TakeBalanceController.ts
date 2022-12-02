import { Request, Response } from 'express'
import { TakeBalanceUseCase } from './TakeBalanceUseCase'

export class TakeBalanceController {

  async handle(request: Request, response: Response) {
    const { cpf } = request.body

    const takeBalanceUseCase = new TakeBalanceUseCase()

    const result = await takeBalanceUseCase.execute({ cpf })

    return response.status(201).json({ balance: result })
  }
}