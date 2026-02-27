import React from 'react'
import { useEffect } from 'react'

const Navbar = (props) => {
    useEffect(()=> {
        alert("run on every render")
    })

    useEffect(()=> {
        alert("run on first render")
        return () => {
        alert("runs when th e component unmounted")}
    },[])

    useEffect(()=> {
        alert("count was changed")
    },[props.count])
    
  
  return (
    <div>
      hey i am a navbar 
    </div>
  )
}

export default Navbar
