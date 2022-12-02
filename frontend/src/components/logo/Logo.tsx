import { Link } from 'react-router-dom'

export function Logo() {

  return (
    <Link to="/" className='flex flex-col text-2xl'>
      <span className='font-bold bg-primary w-[80%]'>DIGITAL</span>
      <span className='font-bold bg-secondary'>REPUBLIC</span>
    </Link>
  )
}