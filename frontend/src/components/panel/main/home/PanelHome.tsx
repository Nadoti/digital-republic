import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { useLogin } from '../../../../hooks/useLogin'
import { toast } from 'react-toastify';
import { Input } from '../../../forms/Input';
import { Button } from '../../../forms/Button';
import AccountEntry from './accountEntry/AccountEntry'
import { AccountWithdrawal } from './accountWithdrawal/AccountWithdrawal'
import { AccountBalance } from './accountBalance/AccountBalance'

interface ITransactions {
  cpf: string
  cpfcliente: string
  createdAt: string
  id: string
  nome: string
  nomecliente: string
  value: number
}

export function PanelHome() {
  const search = useLogin()
  const [transactions, setTransactions] = React.useState<ITransactions[]>([])
  const token = localStorage.getItem('token')
  const cpf = localStorage.getItem('cpf')

  async function takeTransactions(query?: string, operation?: string) {
    await axios(
      {
        method: 'post',
        url: 'http://localhost:4444/user/transactions',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          cpf: cpf,
          query: query,
          operation: operation
        },
      }
    ).then((value: AxiosResponse) => {
      setTransactions(value.data.takeAllTransactions)
    }).catch(err => {
      toast.error(`${err.response.data.message}`, {
        position: "top-right",
        autoClose: 1500,

      });
    })
  }

  function handleSearchTransaction() {
    takeTransactions(search.value)
  }

  function handleSearchDebitedTransaction() {
    takeTransactions(undefined, 'debited')
  }

  function handleSearchCreditedTransaction() {
    takeTransactions(undefined, 'credited')
  }

  React.useEffect(() => {
    takeTransactions()
  }, [])


  return (
    <section className='flex flex-col items-center gap-8 w-full max-w-[70rem] my-0 mx-auto py-0 px-4'>
      <div className='grid grid-cols-3 mt-20 gap-20 w-full'>
        <AccountEntry transactions={transactions} cpf={cpf} />
        <AccountWithdrawal transactions={transactions} cpf={cpf} />
        <AccountBalance cpf={cpf} token={token} />

      </div>

      <div className='flex flex-col w-full'>
        <div className='py-4 px-0 flex gap-2 justify-end'>
          <button
            className='py-2 px-4 border-solid bg-none rounded-lg transition-all ease-in-out text-blue-400 border-blue-400 hover:bg-blue-700 hover:text-white'
            onClick={handleSearchDebitedTransaction}
          >
            Entrante
          </button>
          <button
            className='py-2 px-4 border-solid bg-none rounded-lg transition-all ease-in-out text-red-400 border-red-400 hover:bg-red-700 hover:text-white'
            onClick={handleSearchCreditedTransaction}
          >
            Saído
          </button>
        </div>
        <div className='grid grid-cols-search gap-4'>
          <Input
            type='text'
            name="search"
            {...search}
          />
          <Button onClick={handleSearchTransaction}>Buscar</Button>
        </div>
      </div>

      <table className='w-full border-spacing-[0 0.5rem]'>
        <thead >
          <tr className='text-left bg-zinc-800 text-zinc-200'>
            <th className='py-5 px-8 w-1/2 rounded-l-md '>Recebeu</th>
            <th className='py-5 px-9 '>Valor</th>
            <th className='py-5 px-8 '>Gastou</th>
            <th className='py-5 px-8 rounded-r-md '>Data da Transação</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td className='py-5 px-8 bg-zinc-100 w-1/2 rounded-l-md text-zinc-500'>{transaction.nome}</td>
              {transaction.cpf === cpf ? (
                <td className='text-blue-700 bg-zinc-100 py-5 px-8' >{new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(transaction.value)}</td>
              ) : (
                <td className='text-red-500 bg-zinc-100 py-5 px-8' >- {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(transaction.value)}</td>
              )}
              <td className='py-5 px-8 bg-zinc-100 text-zinc-500'>{transaction.nomecliente}</td>
              <td className='py-5 px-8 bg-zinc-100 rounded-r-md text-zinc-500'>{new Intl.DateTimeFormat("pt-Br").format(new Date(transaction.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  )
}