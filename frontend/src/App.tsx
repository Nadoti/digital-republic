import { Router } from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ContextUserData } from "./context/UserContext";
import 'react-toastify/dist/ReactToastify.css';

export function App() {

  return (
    <BrowserRouter>
      <ContextUserData>
        <Router />
        <ToastContainer />
      </ContextUserData>
    </BrowserRouter>
  )
}

