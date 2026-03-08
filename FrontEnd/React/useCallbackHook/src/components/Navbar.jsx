import React from 'react'

const Navbar = ({adjective, getAdjective}) => {
  return (
    <div>
      i am a {adjective} navabr
       <button onClick={()=>{getAdjective()}}>{getAdjective()}</button>
    </div>
  )
}

export default Navbar
