import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const inputRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleClick = () => {
    if (btnRef.current.style.backgroundColor == "green") {
      btnRef.current.style.backgroundColor = ""
    }
    else {
      btnRef.current.style.backgroundColor = "green"
    }
  }

  return (
    <>
      <input ref={inputRef} placeholder="enter your name" />
      <button ref={btnRef} onClick={handleClick}>
        count is {count}
      </button>
    </>
  )
}

export default App