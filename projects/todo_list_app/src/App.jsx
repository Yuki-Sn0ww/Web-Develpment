import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { CiEdit } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [isCompleted, setisCompleted] = useState(false);
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }


  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveTols()
  };
  const handleCheckBox = (e) => {
    let id = e.target.name
    console.log(id)
    let index = todos.findIndex((item) => item.id === id)
    console.log(index)
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    saveTols()

  }

  const handleEdit = (e) => {
    let id = e.target.name
    let t = todos.filter((item) => {
      return item.id === id
    })
    settodo(t[0].todo)
    let newtodos = todos.filter((item) => {
      return item.id !== id
    })
    settodos(newtodos)
    saveTols()
  };


  const handleDelete = (e) => {
    let id = e.target.name
    let newtodos = todos.filter((item) => {
      return item.id !== id
    })
    settodos(newtodos)
    saveTols()

  };
  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  };
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-amber-100 my-5 rounded-xl p-5">
        <h2 className="text-xl font-bold">Add new todo</h2>
        <input
          onChange={handleChange}
          type="text"
          value={todo}
          
          className="border-black border-2 rounded-xl disabled:bg-amber-100"
        ></input>
        <button
          onClick={handleAdd} disabled={todo.length<=3}
          className="mx-5 bg-amber-200 border-2 rounded-xl px-3 hover:bg-amber-500 cursor-pointer"
        >
          Add
        </button>
        <div className="my-4">
          <h2 className="font-bold text-xl">Your Todes</h2>
          <div className="container flex gap-2">
            <input onChange ={toggleFinished} type="checkbox" checked={showfinished}/>
            <div className="font-bold">show completed todo</div>
          </div>

          {todos.map((items) => {
            return (showfinished || !items.isCompleted) && (
              <div key={items.id} className="todesContainer flex my-4">
                <input name={items.id} onChange={handleCheckBox} type="checkbox" className="mx-2"></input>
                <div
                  name={items.id} className={`${items.isCompleted ? "line-through" : ""}  min-w-[60vw] text-wrap`}
                >
                  {items.todo}
                </div>
                <button name={items.id}
                  onClick={handleEdit}
                  className="mx-2 bg-amber-200 border-2 rounded-xl px-3 hover:bg-amber-500 cursor-pointer"
                >
                  <CiEdit />
                </button>
                <button name={items.id}
                  onClick={handleDelete}
                  className="mx-2 bg-amber-200 border-2 rounded-xl px-3 hover:bg-amber-500 cursor-pointer"
                >
                  <FaDeleteLeft />
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
