import { prisma } from "../../../../database/prismaClient";

interface ICreateTransaction {
  cpf: string;
  value: number;
  cpfClientAccount: string
}

export class CreateTransactionsUseCase {

  async execute({ cpf, value, cpfClientAccount }: ICreateTransaction) {

    if (cpf === cpfClientAccount) {
      throw new Error("Você não pode fazer uma transação para si mesmo")
    }

    if (value < 0) {
      throw new Error("Valor não pode ser negativo")
    }

    if (value > 2000) {
      throw new Error("Valor Maximo para transferências é R$2000")
    }



    const verifyAccountClientExist = await prisma.users.findFirst({
      where: {
        cpf: cpfClientAccount
      }
    })

    if (!verifyAccountClientExist) {
      throw new Error("A conta que está recebendo transação não existe!")
    }

    const userAccount = await prisma.users.findFirst({
      where: {
        cpf
      }
    })

    const accountIDUser = userAccount.accountId
    const accountIDClient = verifyAccountClientExist.accountId

    const accountUser = await prisma.accounts.findFirst({
      where: {
        id: accountIDUser
      }
    })

    const accountClient = await prisma.accounts.findFirst({
      where: {
        id: accountIDClient
      }
    })

    if (accountUser.balance < value) {
      throw new Error("Saldo Insuficiente")
    }


    await prisma.accounts.update({
      where: {
        id: accountUser.id
      },
      data: {
        balance: accountUser.balance - value
      }
    })

    await prisma.accounts.update({
      where: {
        id: accountClient.id
      },
      data: {
        balance: accountClient.balance + value
      }
    })

    const transaction = await prisma.transactions.create({
      data: {
        creditedAccountId: accountUser.id,
        debitedAccountId: accountClient.id,
        value: value
      }
    })

    return transaction
  }

}