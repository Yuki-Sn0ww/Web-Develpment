import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import About from './components/About.jsx'
import User from './components/User.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element :<><Navbar/><Home/></>
    },
    {
      path : "/about",
      element :<><Navbar/><About/></>
    },
    {
      path : "/login",
      element :<><Navbar/><Login/></>
    },
    {
      path : "/user/:username",
      element :<><Navbar/><User/></>
    }
  ])

  return (
    <>
  <RouterProvider router={router} />
    </>
  )
}

export default App
