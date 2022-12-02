import React from "react";
import { useLogin } from "../../../../hooks/useLogin";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from "../../../forms/Button";
import { Input } from "../../../forms/Input";
import { AccountBalance } from "../home/accountBalance/AccountBalance";

export function Transferencias() {

  const transferValue = useLogin()
  const transferCpfClient = useLogin()
  const navigate = useNavigate();

  const token = localStorage.getItem('token')
  const cpf = localStorage.getItem('cpf')

  async function handleTransfer(e: React.FormEvent) {
    e.preventDefault()

    let cpfValue = transferCpfClient.value.replace(/\D+/g, '');
    let valueFinal = Number(transferValue.value)

    if (valueFinal === 0) {
      toast.error('Valor não pode ser 0', {
        position: "top-right",
        autoClose: 1500,
      });
      return
    }

    await axios(
      {
        method: 'post',
        url: 'http://localhost:4444/user/transaction',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          cpf: cpf,
          value: valueFinal,
          cpfClientAccount: cpfValue
        },
      }
    ).then((value) => {
      toast.success("Transferência realizada com Sucesso", {
        position: "top-right",
        autoClose: 1500,
      });
      navigate("/painel/home")
    }).catch(err => {
      toast.error(`${err.response.data.message}`, {
        position: "top-right",
        autoClose: 1500,

      });
    })
  }

  return (
    <section className="max-w-xl mt-40 mr-auto mb-0 ml-auto">
      <AccountBalance cpf={cpf} token={token} />
      <h2 className="text-[2rem] font-bold text-gray-500 mb-8">Transferência</h2>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          label="Valor"
          name="transferValue"
          {...transferValue}
        />
        <Input
          type="text"
          label="CPF do Cliente"
          name="cpf"
          {...transferCpfClient}
        />
        <Button onClick={handleTransfer}>Transferir</Button>
      </div>
    </section>
  )
}