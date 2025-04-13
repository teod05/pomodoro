import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';


const API_Base = 'http://localhost:3000/todo'



// implement edit as well
function App() {

  const [items, setItem] = useState([])

  useEffect( () => {
    getTodos()}, [])

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
          />
          <button className="add-button">
            <span className="button-text">Add</span>
            <span className="button-icon">+</span>
          </button>
        </div>
        <div className="todo-list">
          {items.map((item) => {
            const {_id, name, completed, duedate} = item
            return <TodoItem name={name} completed={completed} duedate={duedate} id={_id}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
