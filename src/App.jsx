
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup'
import Login from './pages/login'
import Home from './pages/home'
import { ToastContainer } from 'react-toastify'
import ForgetPass from './pages/forgetPass'

function App() {

  return (
    <>

<BrowserRouter>
    <ToastContainer />
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/log-in' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/forgot-password' element={<ForgetPass />} />
    </Routes>
</BrowserRouter>



    </>
  )
}

export default App
