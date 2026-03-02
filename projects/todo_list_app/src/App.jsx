import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [isCompleted, setisCompleted] = useState(false);

  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
  };
  const handleCheckBox = (e) => {
    let id = e.target.name
    todos.filter((item)=> {
      if(item.id == id) {
      item.isCompleted ? isCompleted = false : isCompleted = true 
      }
    })
    changetodo.isCompleted ? {isCompleted : false }:{isCompleted : true }
  }
  
  const handleEdit = () => { };
  const handleDelete = () => { };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-amber-100 my-5 rounded-xl p-5">
        <h2 className="text-xl font-bold">Add new todo</h2>
        <input
          onChange={handleChange}
          type="text"
          value={todo}
          className="border-black border-2 rounded-xl"
        ></input>
        <button
          onClick={handleAdd}
          className="mx-5 bg-amber-200 border-2 rounded-xl px-3 hover:bg-amber-500 cursor-pointer"
        >
          Add
        </button>
        <div className="my-4">
          <h2 className="font-bold text-xl">Your Todes</h2>

          {todos.map((items) => {
            return (
              <div className="todesContainer flex my-4">
                <input name = {todo.id} onChange={handleCheckBox}type="checkbox" className="mx-2"></input>
                <div
                  className={`${items.isCompleted ? "line-through" : ""} min-w-[60vw] `}
                >
                  {items.todo}
                </div>
                <button
                  onClick={handleEdit}
                  className="mx-2 bg-amber-200 border-2 rounded-xl px-3 hover:bg-amber-500 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="mx-2 bg-amber-200 border-2 rounded-xl px-3 hover:bg-amber-500 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
