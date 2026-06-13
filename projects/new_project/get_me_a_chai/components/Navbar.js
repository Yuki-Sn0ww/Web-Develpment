import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="text-black flex justify-between bg-white h-12 items-center p-6">
      
<div className="flex items-center gap-2 text-2xl font-bold">
  <Image src="/518713.png" alt="logo" width={40} height={80} className="h-10  bg-white " />
  Penguin.sh
</div>
      <ul className="flex gap-7">
        <li className="text-xl">~/leaderboard</li>
        <li className="text-xl">~/about</li>
      </ul>
      <div className="flex gap-5">
        <button className="mx-2 text-xl">sign in</button>
        <button className="text-lg border-1 border-black px-3  rounded-xl">
          login with github
        </button>
      </div>
    </div>
  );
};

export default Navbar;
