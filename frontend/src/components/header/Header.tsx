import { Link } from 'react-router-dom'
import { Logo } from '../logo/Logo'

export function Header() {

  return (
    <header className='bg-zinc-900'>
      <div className='max-w-[70rem] my-0 mx-auto flex items-center justify-between p-4'>
        <Logo />
        <nav className='flex gap-8 text-lg font-bold'>
          <Link to="login" className='text-[#8D8D99] bg-[#323238] py-2 px-4 rounded-lg hover:brightness-90'>Login</Link>
          <Link to="cadastrar" className='text-[#121214] bg-primary py-2 px-4 rounded-lg hover:brightness-90'>Register</Link>
        </nav>
      </div>
    </header>
  )
}