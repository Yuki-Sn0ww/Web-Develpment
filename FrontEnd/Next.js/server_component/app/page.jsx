"use client"
import React from 'react'
import { useState } from 'react'
const page = () => {
  const [count, setcount] = useState(0)
  return (
    <div>
      i am component {count}
      <br></br>
      <button onClick={()=> setcount(count + 1)}>click me</button>
    </div>
  )
}

export default page
