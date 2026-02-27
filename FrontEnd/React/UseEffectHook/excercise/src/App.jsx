import { useState, useEffect } from 'react'
import './App.css'
function App() {
  const [count, setCount] = useState(0)
  const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
      document.title = `count is ${count}`
    }, [count])
    
    useEffect(() => {
      window.addEventListener("resize", ()=> {
        setWidth(window.innerWidth);
      });
      return () => {
        alert("dhami")
        window.removeEventListener("resize", ()=> {
        setWidth(window.innerWidth);
      });

      }
    }, [])
    
  return (
    <>
        <p>window width is {width}</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
    </>
  )
}

export default App
