import { useState } from 'react'
import "./App.css"
import Navbar from './components/Navabar'
function App() {
  const [value, setValue] = useState(0)
  return (
    <div className="App">
      <Navbar logoText = "dhami hu mai"/>
      <div className = 'value'> {value}</div>
      <button onClick = {()=>{
        setValue(value + 1)
      }}>click me</button>
    </div>
  );
}

export default App;
