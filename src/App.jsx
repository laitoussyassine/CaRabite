import { Route, Routes } from "react-router-dom"
import Home from "./pages/forms/Home"
import Login from "./pages/forms/Login"
import Register from "./pages/forms/Register"

function App() {
  return (
    <>
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
