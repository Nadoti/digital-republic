
import React from 'react'
import totalImg from '../../../../../assets/total.svg'
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios'

export function AccountBalance({ cpf, token }) {

  const [balance, setBalance] = React.useState<number>(0)

  async function takeBalance() {
    await axios(
      {
        method: 'post',
        url: 'http://localhost:4444/user/balance',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          cpf: cpf
        },
      }
    ).then((value: AxiosResponse) => {
      setBalance(value.data.balance)
    }).catch(err => {
      toast.error(`${err.response.data.message}`, {
        position: "top-right",
        autoClose: 1500,

      });
    })
  }

  React.useEffect(() => {
    takeBalance()
  }, [])


  return (
    <div className='flex flex-col bg-blue-300 py-8 px-4 gap-8 rounded-lg mb-4'>
      <div className='flex items-center justify-between'>
        <span className='text-3xl text-blue-500'>
          {new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          }).format(balance)}
        </span>
        <img src={totalImg} alt="incomeImg" />
      </div>
      <h3 className='text-lg font-bold text-blue-500'>Saldo na Conta</h3>

    </div>
  )
}
