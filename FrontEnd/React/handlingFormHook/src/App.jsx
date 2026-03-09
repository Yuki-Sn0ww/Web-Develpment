import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmiiting},
  } = useForm()

  return (
    <>
    <div className="container">
      <form>
        <input placeholder='username' type ='text' value={username}></input>
        <input placeholder='pasword' type='password' value={password}></input>
        <input placeholder='email' type ='email' value={email}></input>
        <button>submit</button>
      </form>
    </div>
    
    </>
  )
}

export default App
