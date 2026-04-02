import React from "react";

const Navbar = () => {
  return (
    <div className="bg-black h-15 w-full flex items-center justify-between text-white px-4">
      <div className="logo text-green-700 font-bold text-2xl hover:text-green-600">
        <span className='text-green-700 font-bold text-2xl"'>&lt;</span>
        PassOp
        <span className='text-green-700 font-bold text-2xl"'>&gt;</span>
      </div>
      <div>
        <ul className="flex gap-5">
          <li className="hover:font-bold cursor-pointer">Home</li>
          <li className="hover:font-bold cursor-pointer">About</li>
          <li className="hover:font-bold cursor-pointer">Contact</li>
          <li className="hover:font-bold cursor-pointer">About</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
