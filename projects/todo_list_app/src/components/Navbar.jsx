import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-amber-300 flex justify-between text-black py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-8 font-serif">TodoList</span>
      </div>
      <ul className="mx-9 flex gap-8 ">
        <li className="cursor-pointer hover:font-bold transition-all duration-20">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all duration-20">About</li>
      </ul>
    </nav>
  );
};

export default Navbar;
