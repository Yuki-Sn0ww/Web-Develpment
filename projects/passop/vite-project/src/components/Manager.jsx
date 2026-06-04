import React from "react";
import { TbWorldWww } from "react-icons/tb";

function Manager() {
  return (
    <div className="flex flex-col items-center flex-1 w-full">
      <div className="text-4xl text-[#232050] mt-5">
        Personal Password Manager
      </div>

      <div className="bg-[FFFFFF] border-1 border-[#DCDAFF] rounded-2xl flex flex-col w-[70%] gap-5 mt-5 p-2 items-center">
        <span className="text-[#322D64] text-[20px]">
          Add New Password
        </span>
        <input
          className="bg-[#F8F8FF] border-1 border-[#D7D4FF] rounded-xl w-[95%] p-2 focus:outline-none focus:border-[#6366F1]"
          type="text"
          placeholder="enter website name"
        />
        <input
          className="bg-[#F8F8FF]  border-1 border-[#D7D4FF] rounded-xl w-[95%] p-2 focus:outline-none focus:border-[#6366F1]"
          type="text"
          placeholder="enter website url"
        />
        <input
          className="bg-[#F8F8FF]  border-1 border-[#D7D4FF] rounded-xl w-[95%] p-2 focus:outline-none focus:border-[#6366F1]"
          type="password"
          placeholder="enter website password"
        />
        <button className="bg-[#6366F1] text-white p-4 w-[95%] rounded-xl">
          Save
        </button>
      </div>

      <div className="bg-[FFFFFF] border-1 border-[#DCDAFF] rounded-2xl flex flex-col w-[70%] h-[330px] mt-4 p-2 items-center">
        <span className="text-[#322D64] text-[20px]">Saved PassWords 4</span>
        <grid>
            
        </grid>
      </div>
    </div>
  );
}

export default Manager;
