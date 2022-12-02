import { prisma } from "../../../../database/prismaClient"
import { sign } from 'jsonwebtoken'

interface IAuthenticateUser {
  username: string
  cpf: string
}


export class AuthenticateUserUseCase {

  async execute({ username, cpf }: IAuthenticateUser) {

    const cpfUser = await prisma.users.findFirst({
      where: {
        cpf
      }
    })

    const user = await prisma.users.findFirst({
      where: {
        username
      }
    })

    if (!cpfUser || !user) {
      throw new Error("Username or cpf invalid")
    }



    const token = sign({ username }, "019acc25a4e242bb55ad489832ada12d", {
      subject: user.id,
      expiresIn: "1d"
    })

    const result = {
      token,
      username,
      cpf
    }

    return result

  }


}