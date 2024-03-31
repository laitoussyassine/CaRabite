import { Route, Routes } from "react-router-dom"
import NavBar from "./components/header/NavBar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Toaster } from 'react-hot-toast';
import Acoount from "./dashboard/carowner/Acoount"
import Dashboard from "./dashboard/mechanic/Dashboard"
import ProtectedRoutes from "./routes/ProtectedRoutes"

function App() {
  return (
    <>

      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register"element={<Register />}/>
        <Route path="carowner/profile/me" element={ 
        <ProtectedRoutes allowedRole={['carowner']}>
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
