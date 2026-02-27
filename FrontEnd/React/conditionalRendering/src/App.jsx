import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [showBtn, setshowBtn] = useState(false)
  const [todos, setTodos] = useState([          
  { title: "Hey", desc: "I am a good todo" },
  { title: "Hey Another todo", desc: "I am a good todo too" },
  { title: "Hey I am grocery todo", desc: "I am a good todo but I am grocery todo" },
])
const btnRef = useRef()

useEffect(() => {
  if (showBtn == true) {
    btnRef.current.style.backgroundColor = "green"
  } else {
    btnRef.current.style.backgroundColor = "red"
  }
}, [showBtn])

  return (
    <>
        {showBtn ? <button ref = {btnRef}>i am true now</button> : <div ref = {btnRef}>i am false now</div>}
        <button onClick={() => setshowBtn(!showBtn)}>
  Toggle showbtn
</button>
    </>
  )
}

export default App
