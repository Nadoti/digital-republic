import { prisma } from '../../../../database/prismaClient'

interface ICreateUser {
  username: string;
  cpf: string;
}

export class CreateUserUseCase {
  async execute({ username, cpf }: ICreateUser) {

    const verifyUserExist = await prisma.users.findFirst({
      where: {
        cpf
      }
    })


    if (verifyUserExist) {
      throw new Error("CPF já cadastrado!")
    }

    const client = await prisma.users.create({
      data: {
        username,
        cpf,
        account: {
          create: {
            balance: 100
          }
        }
      }
    })

    return client

  }
}