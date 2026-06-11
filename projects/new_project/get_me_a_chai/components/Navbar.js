import React from 'react'

const Navbar = () => {
  return (
    <div className="text-white flex justify-between bg-red-600 px-80 h-14 items-center">
      <h1>Penguin.sh</h1>  
      <ul className="flex gap-7">
        <li>~/explore</li>
         <li>~/feed</li>
          <li>~/leaderboard</li>
           <li>~/about</li>
      </ul>
      <div className="">
        <button className='mx-2'>sign in</button>
        <button>login with github</button>
      </div>
    </div>
  )
}

export default Navbar