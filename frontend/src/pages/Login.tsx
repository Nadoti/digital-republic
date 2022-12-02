import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/forms/Button'
import { Input } from '../components/forms/Input'
import { Logo } from '../components/logo/Logo'
import { api } from '../api/axios'
import { useLogin } from '../hooks/useLogin'
import { toast } from 'react-toastify';

export function Login() {

  const username = useLogin()
  const cpf = useLogin()
  const navigate = useNavigate();

  async function handleFormLogin(e: React.FormEvent) {
    e.preventDefault()

    let cpfValue = cpf.value.replace(/\D+/g, '');

    await api.post('/user/authenticate', {
      username: username.value,
      cpf: cpfValue

    })
      .then(valor => {
        window.localStorage.setItem('cpf', valor.data.cpf)
        window.localStorage.setItem('userName', valor.data.username)
        window.localStorage.setItem('token', valor.data.token)
        window.localStorage.setItem('isLoggedIn', JSON.stringify(true))
        navigate('/painel/home')
      })
      .catch(err => {
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

        <h2 className='text-[2.5rem]'>Login</h2>

        <form className='flex flex-col gap-4'>
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
          <Button className='mt-8' onClick={handleFormLogin}>Entrar</Button>
          <p className='m-auto'>Não tem uma conta ? <Link to='/cadastrar' className='underline hover:text-zinc-200'>Cadastre-se</Link></p>
        </form>

      </div>
    </section>
  )
}