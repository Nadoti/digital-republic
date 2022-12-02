import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface UserProviderProps {
  children: ReactNode;
  route: string;
}

export function ProtectedRoute({ children, route }: UserProviderProps) {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

  return isLoggedIn ? <Navigate to={route} /> : children
}