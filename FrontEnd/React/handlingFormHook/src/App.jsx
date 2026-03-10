import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  // const delay = (d)=> {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(()=>{
  //       resolve();
  //     }, d * 1000);
  //   })
  // }
  const onSubmit = async (data) => {
    // await delay(2);
    // console.log(data);
    // if (data.username != "dhami") {
    //   setError("myform", {message : "invalid username"})
    // }
    let r = await fetch("http://localhost:3000/", {
      method: "POST", headers: {
        "Content-Type": "application/json"}, body : JSON.stringify(data)})
    let res = await r.text()
    console.log(data, res)

  }

  return (
    <>
    {isSubmitting && <div>loading...</div>}
      <div className="container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("username", {required: { value: true, message: "this field is required"}, minLength: { value: 3, message: "min length is three" }, maxLength: { value: 8, message: "max length is 8" }})} placeholder='username' type ='text' ></input>
        {errors.username && <div>{errors.username.message}</div>}
        <input {...register("password")} placeholder='pasword' type='password' ></input>
        <input {...register("email")} placeholder='email' type='email'></input>
        <button disabled={isSubmitting}>submit</button>
        {errors.myform && <div>{errors.myform.message}</div>}
      </form>
    </div >
    
    </>
  )
}

export default App
