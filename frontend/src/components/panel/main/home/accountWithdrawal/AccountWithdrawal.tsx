import outcomeImg from '../../../../../assets/outcome.svg'

interface IpropsAccountWithDrawal {
  transactions: [
    cpf: string,
    cpfcliente: string,
    createdAt: string,
    id: string,
    nome: string,
    nomecliente: string,
    value: number
  ];
  cpf: string
}

export function AccountWithdrawal({ transactions, cpf }: IpropsAccountWithDrawal) {

  const filterValueOutcome = transactions.filter((val) => {
    if (val.cpf !== cpf) {
      return val.value
    }
  })

  const valueOutcome = filterValueOutcome.reduce((acc, cur) => acc + cur.value, 0)

  return (
    <div className='flex flex-col bg-gray-300 py-8 px-4 gap-8 rounded-lg mb-4'>
      <div className='flex items-center justify-between'>
        <span className='text-3xl text-red-500'>
          {new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          }).format(valueOutcome)}
        </span>
        <img src={outcomeImg} alt="incomeImg" />
      </div>
      <h3 className='text-lg font-bold text-red-500'>Saidas</h3>
    </div>
  )
}
