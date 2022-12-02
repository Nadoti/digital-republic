import incomeImg from '../../../../../assets/income.svg'

interface IpropsAccountEntry {
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

export default function AccountEntry({ transactions, cpf }: IpropsAccountEntry) {

  const filterValueIncome = transactions.filter((val) => {
    if (val.cpf === cpf) {
      return val.value
    }
  })

  const valueIncome = filterValueIncome.reduce((acc, cur) => acc + cur.value, 0)

  return (
    <div className='flex flex-col bg-gray-300 py-8 px-4 gap-8 rounded-lg mb-4'>
      <div className='flex items-center justify-between'>
        <span className='text-3xl text-green-700'>
          {new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          }).format(valueIncome)}
        </span>
        <img src={incomeImg} alt="incomeImg" />
      </div>
      <h3 className='text-lg font-bold text-green-500'>Entradas</h3>
    </div>
  )
}
