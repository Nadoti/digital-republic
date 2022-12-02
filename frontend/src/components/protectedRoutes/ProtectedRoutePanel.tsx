import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface UserProviderProps {
  children: ReactNode;
  route: string;
}

export function ProtectedRoutePanel({ children, route }: UserProviderProps) {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

  return isLoggedIn ? children : <Navigate to={route} />
}