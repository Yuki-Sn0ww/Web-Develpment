import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const count = useSelector((state) => state.counter.value)
    const navbarCount = useSelector((state) => state.navbarCount.value) 
  return (
    <>
    <div>i am a navbar counter {navbarCount}</div>
    <div>
      i am a navbar counter is {count}
    </div>
      </>
  )
}

export default Navbar
