import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const myRef = useRef(0)
  console.log(myRef.current)
  myRef.current = myRef.current + 1
  console.log(myRef.current)

  const btnRef = useRef()
  console.log(btnRef.current)

  useEffect(()=>{
    if (count == 5) {
    btnRef.current.style.backgroundColor = "red"}
    else {
    btnRef.current.style.backgroundColor = ""  // resets to original color
  }
  }, [count])

  return (
    <>
        <button ref = {btnRef}onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
  
    </>
  )
}

export default App
