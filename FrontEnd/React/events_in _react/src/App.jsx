import { useState } from 'react'
import './App.css'

function App() {
  const handleClick = () => {
    alert("i am dhami");

  }
  // const handleChange = (e) => {
  //   // setname(e.target.value)
  // }

   const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value})
  }
  const  [name, setname] = useState("dhami")
  const [form, setform] = useState({email :"", phone : ""})
  return (
    <>
     <button onClick ={handleClick}>click me</button>
     {/* <input type ='text' value =
     {name} placeholder='enter name'></input>
     <input type ='text' value =
     {name} onChange = {handleChange}></input> */}

     <input type ='text' name ='email'value = {form.email} onChange = {handleChange}/>
     <input type ='text' name ='phone'value = {form.phone} onChange = {handleChange}/>
    </>
  )
}

export default App
