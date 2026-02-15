import React from 'react'
import Btn from './Btn'

const Navabar = (props) => {
  return (
    <div>
      <div className="logo">{props.logoText}</div>
        <ul>
          <li>hone</li>
           <li>about</li>
            <li>contact</li>
        </ul>
       <Btn/>
    </div>
  )
}

export default Navabar
