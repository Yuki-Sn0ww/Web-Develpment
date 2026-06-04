import React from "react";
import { BsFillShieldLockFill } from "react-icons/bs";


function Navbar() {
  return (
    <nav className="flex text-[#6366F1] p-5 justify-between">
      <div className="text-3xl flex gap-2 items-center">
        <BsFillShieldLockFill />
        PassOP
      </div>
      <div className="items">
        <ul className="flex gap-4 text-xl text-[#645F82]">
          <li>Home</li>
          <li>Passwords</li>
          <li>About</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
