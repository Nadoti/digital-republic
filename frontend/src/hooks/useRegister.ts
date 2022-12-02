import React from "react"

interface propsType {
  email: {
    regex: RegExp;
    message: string
  }
}

const types: propsType = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'E-mail inválido'
  },
}

export function useRegister(type: string) {

  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState('')
  const [isError, setIsError] = React.useState(false)

  function validade(val: string) {
    if (!type) {
      return true
    } else if (val.length === 0) {
      setError('campo não pode ser vazio')
      setIsError(true)
      return false
    } else if (types[type] && !types[type].regex.test(val)) {
      setError(types[type].message)
      setIsError(true)
      return false
    } else {
      setError('')
      setIsError(false)
      return true
    }
  }


  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (isError) validade(target.value)
    setValue(target.value)
  }




  return {
    value,
    error,
    isError,
    onChange,
    validade: () => validade(value),
    onBlur: () => validade(value)
  }
}