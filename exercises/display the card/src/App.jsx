import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card.jsx'

function App() {
  const [rdata, setrdata] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data =  await response.json();
    setrdata(data)
    console.log(data)

  }

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
      {rdata.map(item=> {
        return <Card  id={item.id}
          title={item.title}
          body={item.body}/>
      })}
    </>
  )
}

export default App
