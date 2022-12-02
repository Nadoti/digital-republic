import { prisma } from "../../../../database/prismaClient"

interface ITakeAllTransactions {
  cpf: string;
  query: string;
  operation: string
}

export class TakeAllTransactionsUseCase {
  async execute({ cpf, query, operation }: ITakeAllTransactions) {

    const takeUser = await prisma.users.findFirst({
      where: {
        cpf
      }
    })

    const takeAccount = await prisma.accounts.findFirst({
      where: {
        id: takeUser.accountId
      }
    })

    let takeAllTransactions: object = {}

    if (operation !== undefined) {
      if (operation === 'debited') {
        takeAllTransactions = await prisma.$queryRaw`select
          u.username AS nome,
          u.cpf AS cpf,
          t.value,
          t."createdAt"::date,
          t.id,
          us.username AS nomeCliente,
          us.cpf AS cpfCliente
        from users u
        inner join transactions t on t."debitedAccountId" = u."accountId"
        inner join users us on us."accountId" != t."debitedAccountId" AND us."accountId" = t."creditedAccountId"
        where t."debitedAccountId" = ${takeAccount.id}
      `
      }
      if (operation === 'credited') {
        takeAllTransactions = await prisma.$queryRaw`select
          u.username AS nome,
          u.cpf AS cpf,
          t.value,
          t."createdAt"::date,
          t.id,
          us.username AS nomeCliente,
          us.cpf AS cpfCliente
        from users u
        inner join transactions t on t."debitedAccountId" = u."accountId"
        inner join users us on us."accountId" != t."debitedAccountId" AND us."accountId" = t."creditedAccountId"
        where t."creditedAccountId" = ${takeAccount.id}
      `
      }
    }

    if (operation === undefined) {
      if (query !== undefined) {
        takeAllTransactions = await prisma.$queryRaw`select
            u.username AS nome,
            u.cpf AS cpf,
            t.value,
            t."createdAt"::date,
            t.id,
            us.username AS nomeCliente,
            us.cpf AS cpfCliente
          from users u
          inner join transactions t on t."debitedAccountId" = u."accountId"
          inner join users us on us."accountId" != t."debitedAccountId" AND us."accountId" = t."creditedAccountId"
          where (t."debitedAccountId" = ${takeAccount.id} OR t."creditedAccountId" = ${takeAccount.id})
          `
        if (query.length < 10 && query.length > 0) {
          throw new Error('Data Inválida')
        } else if (query.length === 10) {
          takeAllTransactions = await prisma.$queryRaw`select
            u.username AS nome,
            u.cpf AS cpf,
            t.value,
            t."createdAt",
            t.id,
            us.username AS nomeCliente,
            us.cpf AS cpfCliente
          from users u
          inner join transactions t on t."debitedAccountId" = u."accountId"
          inner join users us on us."accountId" != t."debitedAccountId" AND us."accountId" = t."creditedAccountId"
          where (t."debitedAccountId" = ${takeAccount.id} OR t."creditedAccountId" = ${takeAccount.id}) AND CAST(t."createdAt" AS DATE) = CAST(${query} AS DATE)
        `
        }
      } else {
        takeAllTransactions = await prisma.$queryRaw`select
            u.username AS nome,
            u.cpf AS cpf,
            t.value,
            t."createdAt"::date,
            t.id,
            us.username AS nomeCliente,
            us.cpf AS cpfCliente
          from users u
          inner join transactions t on t."debitedAccountId" = u."accountId"
          inner join users us on us."accountId" != t."debitedAccountId" AND us."accountId" = t."creditedAccountId"
          where (t."debitedAccountId" = ${takeAccount.id} OR t."creditedAccountId" = ${takeAccount.id})
        `
      }
    }

    return { takeAllTransactions }
  }
}

