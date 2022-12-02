import React from 'react'
import { maskDate, maskCPF } from '../../mask/mask';

interface PropsInput {
  value: string;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  type: string;
  error?: string;
  isError?: boolean
}

export function Input({ value, onChange, name, label, type, error, isError, onBlur }: PropsInput) {

  const handleKeyUp = React.useCallback((e) => {
    if (name === 'search') {
      maskDate(e)
    } else if (name === 'cpf') {
      maskCPF(e)
    }
  }, [name])

  return (
    <section className='relative'>
      <input
        className={`w-full p-[1.125rem] border-solid border-2 border-transparent outline-none text-lg ${isError && 'border-red-500'} rounded-lg transition-all ease-in-out focus:border-primary focus:${isError && 'border-red-500'} hover:border-primary hover:${isError && 'border-red-500'} placeholder:text-transparent inputFormStyles`}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
        onKeyUp={handleKeyUp}
      />
      <label
        className={`absolute top-5 left-4 transition-all pointer-events-none ${isError ? 'text-red-500' : 'text-zinc-400-300'} `}
        htmlFor={name}
      >
        {label}
      </label>
      {isError && <span className='text-red-500 text-sm m-0 text-left max-w[25rem]'>{error}</span>}
    </section>
  )
}