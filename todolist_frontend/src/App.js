import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const baseUrl = "http://localhost:8080"

  const [input, setInput] = useState("");

  useEffect(()=>{
    getTodos();
  }, []);

  async function getTodos(){
    await axios
      .get(baseUrl+"/todo")
      .then((response)=>{
          console.log(response.data)
      })
      .catch((error)=>{
          console.error(error)
      })
  }

  function changeText(e) {    e.preventDefault();
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form>
        <label>Todo</label>
        <input type="text" required={true} value={input} onChange={changeText}/>
        <input type="submit" value="Create"/>
      </form>
    </div>
  );
}

export default App;
