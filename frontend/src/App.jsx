import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main>
        <Outlet />
      </main>

    </>

  )
}

export default App