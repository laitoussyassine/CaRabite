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
import WorkshopDetails from "./components/workshops/WorkshopDetails"
import Contact from "./pages/Contact"
import About from "./pages/About"
import MyWorkshopDetails from "./dashboard/mechanic/MyWorkshopDetails"
import Footer from "./components/footer/Footer"


function App() {
  return (
    <>

      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register"element={<Register />}/>
        <Route path="/workshops"element={<WorkshopsPage />}/>
        <Route path="/workshop/:id" element={<WorkshopDetails />}/>
        <Route path="/myWorkshop/:id" element={ <ProtectedRoutes allowedRole={['mechanic']}>
        <MyWorkshopDetails />
        </ProtectedRoutes>}/>
        <Route path="user/profile/me" element={ <ProtectedRoutes allowedRole={['user']}>
        <Acoount />
        </ProtectedRoutes>}/>
        <Route path="mechanic/profile/me" element={ 
        <ProtectedRoutes allowedRole={['mechanic']}>
          <Dashboard />
        </ProtectedRoutes> }/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
