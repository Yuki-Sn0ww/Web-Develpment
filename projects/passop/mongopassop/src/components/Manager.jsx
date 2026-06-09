import React from "react";
import { TbWorldWww } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const [form, setform] = useState({
    websiteName: "",
    url: "",
    password: "",
  });

  const [passwords, setpasswords] = useState([]);

  const reFetch = async () => {
    const response = await fetch("http://localhost:3000/api/getPasswords");
    const data = await response.json();
    setpasswords(data);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async (e) => {
    if (!form.websiteName || !form.url || !form.password) {
      alert("Please fill in all fields!");
      return;
    }
    if (form._id) {
      let index = passwords.findIndex((item) => item._id === form._id);
      let newPasswords = [...passwords];
      newPasswords[index] = { ...form };
      setpasswords(newPasswords);
      console.log("saving:", newPasswords);
      const editToDb = async (_id) => {
        await fetch(`http://localhost:3000/api/updatePasswords/${_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      };
      await editToDb(form._id);
    } else {
      let tempId = uuidv4();
      let newPasswords = [...passwords, { ...form, _id: tempId }];
      setpasswords(newPasswords);
      console.log("saving:", newPasswords);
      const saveToDb = async (form) => {
        await fetch("http://localhost:3000/api/savePAsswords", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            websiteName: form.websiteName,
            url: form.url,
            password: form.password,
          }),
        });
      };
      await saveToDb(form);
    }
    setform({ websiteName: "", url: "", password: "", _id: "" });
    reFetch();
  };

  const handleDelete = (_id) => {
    let newPasswords = passwords.filter((item) => item._id !== _id);
    setpasswords(newPasswords);
    const updateDb = async () => {
      await fetch(`http://localhost:3000/api/deletePAsswords/${_id}`, {
        method: "DELETE",
      });
      reFetch();
    };
    updateDb();
  };

  const handleEdit = (item) => {
    setform({
      websiteName: item.websiteName,
      url: item.url,
      password: item.password,
      _id: item._id,
    });
  };

  useEffect(() => {
    reFetch();
  }, []);

  return (
    <div className="flex flex-col items-center flex-1 w-full">
      <div className="text-4xl text-[#232050] mt-5">
        Personal Password Manager
      </div>

      <div className="bg-[FFFFFF] border-1 border-[#DCDAFF] rounded-2xl flex flex-col w-[70%] gap-5 mt-5 p-2 items-center">
        <span className="text-[#322D64] text-[20px] self-start ml-9 pt-2">
          Add New Password
        </span>
        <input
          value={form.websiteName}
          onChange={handleChange}
          name="websiteName"
          className="bg-[#F8F8FF] border-1 border-[#D7D4FF] rounded-xl w-[95%] p-2 focus:outline-none focus:border-[#6366F1]"
          type="text"
          placeholder="enter website name"
        />
        <input
          value={form.url}
          onChange={handleChange}
          name="url"
          className="bg-[#F8F8FF]  border-1 border-[#D7D4FF] rounded-xl w-[95%] p-2 focus:outline-none focus:border-[#6366F1]"
          type="text"
          placeholder="enter website url"
        />
        <input
          value={form.password}
          onChange={handleChange}
          name="password"
          className="bg-[#F8F8FF]  border-1 border-[#D7D4FF] rounded-xl w-[95%] p-2 focus:outline-none focus:border-[#6366F1]"
          type="password"
          placeholder="enter website password"
        />
        <button
          onClick={savePassword}
          className="bg-[#6366F1] text-white p-4 w-[95%] rounded-xl"
        >
          Save
        </button>
      </div>

      <div className="bg-[#FFFFFF] border-1 border-[#DCDAFF] rounded-2xl flex flex-col w-[70%] h-[330px] mt-4 p-4 ">
        <span className="text-[#322D64] text-[20px] ml-9 bg-white">
          Saved PassWords 4
        </span>
        {passwords.length === 0 && <p>No Passwords To Show</p>}
        {passwords.length !== 0 && (
          <div className="container overflow-y-scroll ">
            <table className="w-full table-fixed ">
              <thead className="sticky top-0 z-10 bg-white">
                <tr>
                  <th className="  w-1/4 px-4 py-2 text-left">Website</th>
                  <th className=" w-1/4 px-4 py-2 text-left">Username</th>
                  <th className=" w-1/4 px-4 py-2 text-left">Password</th>
                  <th className=" w-1/4 px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {passwords.map((item, index) => {
                  return (
                    <tr key={index} className="border-t-2">
                      <td className="border-t-2 border-[#EDEAFF] w-1/4 px-4 py-2 truncate">
                        {item.websiteName}
                      </td>
                      <td className="border-t-2 border-[#EDEAFF] w-1/4 px-4 py-2 truncate">
                        {item.url}
                      </td>
                      <td className="border-t-2 border-[#EDEAFF] w-1/4 px-4 py-2 truncate">
                        {item.password}
                      </td>
                      <td className="border-t-2 border-[#EDEAFF] w-1/4 px-4 py-2">
                        <button
                          className="mr-3"
                          onClick={() => handleDelete(item._id)}
                        >
                          <RiDeleteBinLine />
                        </button>
                        <button onClick={() => handleEdit(item)}>
                          <FiEdit2 />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Manager;
