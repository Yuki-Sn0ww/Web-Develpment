import React from "react";

const Manager = () => {
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="flex justify-center  flex-col items-center pt-10 gap-4">

        <div className="font-bold text-2xl">
          <span>&lt;</span>PassOP<span>&gt;</span>
        </div>
        <p className="text-grey-400">Your Own Password Manager</p>


        <input placeholder="enter website url" className="border rounded px-3 py-2 w-[60vw]"></input>

        <div className="flex justify-center w-[60vw] gap-3">
          <input className="border rounded px-3 py-2 w-full" placeholder="enter username"></input>
          <input className="border rounded px-3 py-2 w-full" placeholder="enter password"></input>
        </div>

        <button className="bg-green-700 rounded-xl px-6 py-2 mt-10 text-xl">Save</button>

        <div className="">
          <h2 className="text-xl font-bold">Your Passwords</h2>
          <p>No passwords to Show </p>
        </div>
      </div>
    </>
  );
};

export default Manager;
