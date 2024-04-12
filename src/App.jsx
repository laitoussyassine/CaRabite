import { Route, Routes } from "react-router-dom"
import NavBar from "./components/header/NavBar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Toaster } from 'react-hot-toast';
import Acoount from "./dashboard/user/Acoount"
import Dashboard from "./dashboard/mechanic/Dashboard"
import ProtectedRoutes from "./routes/ProtectedRoutes"
import WorkshopsPage from "./pages/WorkshopsPage"

function App() {
  return (
    <>

      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register"element={<Register />}/>
        <Route path="/workshops"element={<WorkshopsPage />}/>
        <Route path="user/profile/me" element={ 
        <ProtectedRoutes allowedRole={['user']}>
          <Acoount />
        </ProtectedRoutes>}/>
        <Route path="mechanic/profile/me" element={ 
        <ProtectedRoutes allowedRole={['mechanic']}>
          <Dashboard />
        </ProtectedRoutes> }/>
      </Routes>
    </>
  )
}

export default App
