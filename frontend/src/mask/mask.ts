import React from "react"

export function maskDate(e: React.ChangeEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 10
  let value = e.currentTarget.value
  value = value.replace(/\D/g, "").replace(/^(\d{10})/, '$1').replace(/^(\d{2})(\d{2})(\d)/, '$1/$2/$3')
  e.currentTarget.value = value
}

export function maskCPF(e: React.ChangeEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14
  let value = e.currentTarget.value
  value = value.replace(/\D/g, "").replace(/^(\d{10})/, '$1').replace(/^(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4')
  e.currentTarget.value = value
}
