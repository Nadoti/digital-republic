import { Route, Routes, useParams } from "react-router-dom"
import { Aside } from "../components/panel/aside/Aside"
import { PanelOptionsRoutes } from "../components/panel/PanelOptionsRoutes/PanelOptionsRoutes"




export function Panel() {
  const path: Object = useParams()
  const urlRoutes: string = path['*']



  return (
    <section className="h-screen bg-zinc-200 grid grid-cols-panel">
      <Aside urlRoutes={urlRoutes} />

      <Routes>
        <Route path={`${urlRoutes}`} element={<PanelOptionsRoutes urlRoutes={urlRoutes} />} />
      </Routes>

    </section>
  )
}