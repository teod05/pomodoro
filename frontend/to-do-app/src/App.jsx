import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';


const API_Base = 'http://localhost:3000/todo'



// implement edit as well
function App() {

  const [items, setItem] = useState([])
  const [input, setInput] = useState("")

  useEffect( () => {
    getTodos()}, [])

  function HandleInput(event){
    setInput(event.target.value)
  }

  const addItem = async() => {
    if (!input.trim()){
      alert("Please enter a task!")
      return
    }
    const data = await fetch(API_Base + "/new", {
      method: "POST",
      headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: input,
    })
  }).then(res => res.json()) //gets the data again I think
    await getTodos()
    setInput('')
  }

  const deleteTodo = async(id) => {
    try{
        const response = await fetch (API_Base + '/delete/' + id, {
            method: 'DELETE'
        })
        if(!response.ok){
            throw new Error("Failed to delete a task")
        }
        const data = await response.json()
        setItem(items => items.filter(item=> item._id !== data._id))
    }catch(error){
        console.error("Error updating task status", error)
    }
}

  const getTodos = () => {
    fetch(API_Base)
    .then(res => res.json())
    .then(data => { console.log(data); setItem(data)})
    .catch(err => console.log(err))
  }

  return (
    <div className="app-container">
      <div className="todo-container">
        <h1 className="app-title">TO DO LIST</h1>
        <div className="input-group">
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={input}
            onChange={HandleInput}
          />
          <button onClick={addItem} className="add-button">
            <span className="button-text">Add</span>
          </button>
        </div>
        <div className="todo-list">
          {items.map((item) => {
            const {_id, name} = item
            return <TodoItem name={name} id={_id} deleteTodo={deleteTodo}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
