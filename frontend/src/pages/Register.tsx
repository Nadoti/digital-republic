import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/axios'
import { Button } from '../components/forms/Button'
import { Input } from '../components/forms/Input'
import { Logo } from '../components/logo/Logo'
import { useRegister } from '../hooks/useRegister'
import { toast } from 'react-toastify';

export function Register() {

  const username = useRegister('username')
  const cpf = useRegister('cpf')
  const navigate = useNavigate();

  async function handleFormRegister(e: React.FormEvent) {
    e.preventDefault()

    let cpfValue = cpf.value.replace(/\D+/g, '');

    await api.post("/user/create", {
      username: username.value,
      cpf: cpfValue
    })
      .then(valor => {
        toast.success(`Cadastro Realizado com Sucesso`, {
          position: "top-right",
          autoClose: 1500,

        });
        navigate('/login')
      }).catch(err => {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 1500,

        });
      })
  }



  return (
    <section className='w-full h-screen flex items-center justify-center flex-col gap-8 bg-zinc-900'>
      <Logo />
      <div className='w-full max-w-[37.5rem] flex flex-col gap-12 text-zinc-400 bg-zinc-800 p-12 rounded-lg'>

        <h2 className='text-[2.5rem]'>Registrar</h2>

        <form className='flex flex-col gap-4' onSubmit={handleFormRegister}>
          <Input
            type="text"
            name="username"
            label="Username"
            {...username}
          />
          <Input
            type="text"
            name="cpf"
            label="CPF"
            {...cpf}
          />
          <Button className='mt-8'>Cadastrar</Button>
          <p className='m-auto'>Já possui uma conta ? <Link to='/login' className='underline hover:text-zinc-200'>Faça o Login</Link></p>
        </form>

      </div>
    </section>
  )
}