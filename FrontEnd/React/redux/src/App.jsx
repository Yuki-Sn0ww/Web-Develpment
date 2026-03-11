import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, multiply} from './redux/counter/counterSlice'
import { navincrement, navdecrement, navmultiply } from './redux/navbarcount/navbarCountSlice'
function App() {

  const count = useSelector((state) => state.counter.value)

  const dispatch = useDispatch()
  return (
    <>
    <Navbar/>
      <div>
        <button onClick={() => {dispatch(decrement())
            dispatch(navdecrement())}}>-</button>
        Currently count is {count}
        <button onClick={() =>{ dispatch(increment())
          dispatch(navincrement())
        }}>+</button>
        <button onClick={() =>{ dispatch(multiply())
          dispatch(navmultiply())
        }}>*</button>
      </div>
    </>
  )
}

export default App
