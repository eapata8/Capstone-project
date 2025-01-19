import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <h1>Hello developpers!</h1>
      <Outlet/>
      <Navbar/>
    </>
  )
}

export default App
