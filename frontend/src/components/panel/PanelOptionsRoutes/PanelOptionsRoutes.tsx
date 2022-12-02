import { PanelHome } from "../main/home/PanelHome"
import { Transferencias } from "../main/transferencias/Transferencias"

interface PropsPanelRoutes {
  home: {
    component: JSX.Element
  }
  transferencia: {
    component: JSX.Element
  }
}

const panelRoutes: PropsPanelRoutes = {
  home: {
    component: <PanelHome />
  },
  transferencia: {
    component: <Transferencias />
  }
}

export function PanelOptionsRoutes({ urlRoutes }: string) {

  return (
    <div className="w-full h-full">
      {urlRoutes && panelRoutes[urlRoutes]?.component}
    </div>
  )
}