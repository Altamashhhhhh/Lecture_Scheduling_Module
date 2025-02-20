import Home from './component/Home'
import "./App.css"
import Login from './component/Login'
import Register from './component/Register'
import Navbar from './component/Navbar'
import Course from './component/Course'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from "./components/ui/toaster"
const App = () => {
  return (
    <>
    <Navbar />
    <Toaster />
    <Routes>
      <Route path='/' element={<Home /> } />
      <Route path='/login' element={<Login /> } />
      <Route path='/register' element={<Register /> } />
      <Route path='/course' element={<Course /> } /> 
    </Routes>
    </>
  )
}

export default App
