import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Panel } from "../pages/Panel";
import { ProtectedRoute } from "../components/protectedRoutes/ProtectedRoute";
import { ProtectedRoutePanel } from "../components/protectedRoutes/ProtectedRoutePanel";



export function Router() {
  return (
    <Routes>

      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={
        <ProtectedRoute route="/painel/home">
          <Login />
        </ProtectedRoute>
      } />

      <Route path="/cadastrar" element={
        <ProtectedRoute route="/painel/home">
          <Register />
        </ProtectedRoute>
      } />

      <Route path="/painel/*" element={
        <ProtectedRoutePanel route="/login">
          <Panel />
        </ProtectedRoutePanel>
      } />
    </Routes>
  )
}