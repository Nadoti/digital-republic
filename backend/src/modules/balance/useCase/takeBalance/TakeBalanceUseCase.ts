import { prisma } from '../../../../database/prismaClient'

interface ITakeBalance {
  cpf: string
}

export class TakeBalanceUseCase {

  async execute({ cpf }: ITakeBalance) {
    const takeUser = await prisma.users.findFirst({
      where: {
        cpf
      }
    })

    const takeBalanceUser = await prisma.accounts.findFirst({
      where: {
        id: takeUser.accountId
      }
    })

    return takeBalanceUser.balance

  }
}