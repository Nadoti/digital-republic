import React from 'react'

type ButtonProps = React.ComponentPropsWithoutRef<'button'>

export function Button({ children, onClick }: ButtonProps) {

  return (
    <button
      className='w-full p-4 bg-primary text-lg font-bold text-white border-none flex items-center justify-center gap-3 rounded-lg hover:brightness-90'
      onClick={onClick}
    >
      {children}
    </button>
  )
}