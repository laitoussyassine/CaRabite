import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      
      <NavBar/>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </>
  )
}

export default App
