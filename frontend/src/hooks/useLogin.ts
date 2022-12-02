import React from "react"


export function useLogin() {
  const [value, setValue] = React.useState('')

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setValue(target.value)
  }

  return {
    value,
    onChange
  }
}