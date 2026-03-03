import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <NavLink to="/" className={(e)=> e.isActive ? "red" : ""}>Home</NavLink>
     <NavLink to="/about" className={(e)=> e.isActive ? "red" : ""}>about</NavLink>
      <NavLink to="/login" className={(e)=> e.isActive ? "red" : ""}>login</NavLink>
       <NavLink to="/user" className={(e)=> e.isActive ? "red" : ""}>user</NavLink>
    </>
  )
}

export default Navbar
