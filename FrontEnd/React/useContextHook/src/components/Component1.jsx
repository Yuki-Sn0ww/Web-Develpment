import React from 'react'
import Btn from './Btn'
import { useContext } from 'react'
import { contx } from '../context/context'

const Component1 = () => {
const value = useContext(contx)
  return (
    <div>
      {value.count}
      <Btn/>
    </div>
  )
}

export default Component1
