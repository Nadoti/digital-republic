import React, { ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = React.createContext({
  user: "",
  setUser: (index: string) => { },
  isLoggedIn: false,
  setIsLoggedIn: (index: boolean) => { },
})

export function ContextUserData({ children }: UserProviderProps) {

  const [user, setUser] = React.useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      {children}
    </UserContext.Provider>
  )
}