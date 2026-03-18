"use client"
import Image from "next/image";
import { POST } from "./api/add/route";

export default function Home() {
  const handleClick = async () => {
    let data = {
      name :"dhami",
      roll : "12"
    }
    let a = await fetch('/api/add', {
      method: 'POST', headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
      console.log(res)
  }
  return (
    <div>
      <h1> api demo </h1>
      <button onClick={handleClick}>dhami</button>
    </div>
  );
}
