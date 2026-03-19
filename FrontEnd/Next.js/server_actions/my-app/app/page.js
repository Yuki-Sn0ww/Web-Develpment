'use client'
import Image from "next/image";
import { submitAction } from "@/actions/form";
import { useRef } from "react";

export default function Home() {
  let ref =useRef()
  return (
    <div>
      <form ref={ref} action={(e) => { submitAction(e) ; ref.current.reset()}} className="p-4 flex gap-5 flex-col max-w-[30vw]">
      <input type="text" name="name" className="bg-white text-black " />
      <input type="text" name="address" className="bg-white text-black" />
      <button type="submit">Submit</button>
    </form>
    </div >
    
  );
}
