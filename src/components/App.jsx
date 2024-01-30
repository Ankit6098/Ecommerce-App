import Navbar from './Navbar'
import '../styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      <Routes>
        <Route path="/sign-up" element={<Signup/>}></Route>
      </Routes>
    </>
  )
}

export default App
