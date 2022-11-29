import React from 'react'
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className='center'>
    <NavLink className="navLink" to="/" >Home</NavLink>
    <NavLink className="navLink" to="/register">Register</NavLink>
    <NavLink className="navLink" to="/login">Login</NavLink>
    <NavLink className="navLink" to="/about">About</NavLink>



</nav>
  )
}

export default Navbar