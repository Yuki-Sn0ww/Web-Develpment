import React from 'react'
import { contx } from '../context/context'
import { useContext } from 'react'

const Btn = () => {
  const { count, setCount } = useContext(contx);
  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>dabao</button>
    </div>
  )
}

export default Btn
