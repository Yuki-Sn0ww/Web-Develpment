import React from "react";
import { useState, useForm, useEffect } from "react";

const Manager = () => {
  const [form, setform] = useState({ url: " ", site: " ", password: " " });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    setpasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="flex justify-center  flex-col items-center pt-10 gap-4">
        <div className="font-bold text-2xl">
          <span>&lt;</span>PassOP<span>&gt;</span>
        </div>
        <p className="text-grey-400">Your Own Password Manager</p>

        <input
          onChange={handleChange}
          name="url"
          value={form.url}
          placeholder="enter website url"
          className="border rounded px-3 py-2 w-[60vw]"
          type="url"
        ></input>

        <div className="flex justify-center w-[60vw] gap-3">
          <input
            onChange={handleChange}
            name="site"
            value={form.site}
            className="border rounded px-3 py-2 w-full"
            placeholder="enter username"
            type="text"
          ></input>
          <input
            onChange={handleChange}
            value={form.password}
            name="password"
            className="border rounded px-3 py-2 w-full"
            placeholder="enter password"
          ></input>
        </div>

        <button
          onClick={savePassword}
          className="bg-green-700 rounded-xl px-6 py-2 mt-10 text-xl"
        >
          Save
        </button>

        <div className="w-[60vw]">
          <h2 className="text-xl font-bold">Your Passwords</h2>
          {passwordArray.length === 0 && <p>No passwords to Show </p>}
          {passwordArray.length != 0 && (
            <table class="table-auto w-full rounded-xl overflow-hidden">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th>url</th>
                  <th>site</th>
                  <th>password</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return <tr key = {index}>
                    <td className="text-center w-32">{item.site}</td>
                    <td className="text-center w-32">{item.url}</td>
                    <td className="text-center w-32">{item.password}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
