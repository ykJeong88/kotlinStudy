import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const baseUrl = "http://localhost:8080"

  const [todos, setTodos] = useState(null);
  const [input, setInput] = useState("");

  useEffect(()=>{
    getTodos();
  }, []);

  async function getTodos(){
    await axios
      .get(baseUrl+"/todo")
      .then((response)=>{
          setTodos(response.data);
          console.log(response.data)
      })
      .catch((error)=>{
          console.error(error)
      })
  }

  function changeText(e) {    e.preventDefault();
    setInput(e.target.value);
  }

  function insertTodo(e) {
    e.preventDefault();

    const insertTodo = async () => {
      await axios
          .post(baseUrl + "/todo", {
              todoName : input
          })
          .then((response)=>{
              setInput("");
              getTodos();
          })
          .catch((error)=>{
              console.error(error);
          })
    }

    insertTodo();
    console.log("할일이 추가됨");
  }

  function updateTodo(id){
      
      const updateTodo = async () => {
        await axios
          .put(baseUrl + "/todo/" + id, {})
          .then((response)=>{
            // getTodos();
            setTodos(
              todos.map((todo)=>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
              )
            )
          })
          .catch((error)=>{
            console.error(error);
          })
      }

      updateTodo();
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios
        .delete(baseUrl + "/todo/" + id, {})
        .then((response)=>{
          // getTodos();
          setTodos(
              todos.filter((todo)=> todo.id !== id)
          )
          
        })
        .catch((error)=>{
          console.error(error);
        })
    }

    deleteTodo();
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={insertTodo}>
        <label>Todo</label>
        <input type="text" required={true} value={input} onChange={changeText}/>
        <input type="submit" value="Create"/>
      </form>

      {
        todos? 
         todos.map((todo)=>{
           return(
             <div className="todo" key={todo.id}>
              <h3>
                <label className={todo.completed?"completed":null} onClick={()=>updateTodo(todo.id)}>
                  {todo.todoName}
                </label>
                <label onClick={()=>deleteTodo(todo.id)}>&nbsp;&nbsp;&nbsp;❌</label>
              </h3>
             </div>
           )
         })
        : null

      }

    </div>
  );
}

export default App;
