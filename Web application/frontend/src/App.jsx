import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from "./components/ScrollToTop"


function App() {

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="pt-16"> {/* 16 = la hauteur du Navbar (h-16) */}
        <Outlet />
      </main>
      <Footer />

    </>
  )
}

export default App
