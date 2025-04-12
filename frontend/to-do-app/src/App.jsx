import { useState } from 'react';
import TodoItem from './TodoItem';

function App() {
  return (
    <div className="app-container">
      <div className="todo-container">
        <h1 className="app-title">My Tasks</h1>
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
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </div>
      </div>
    </div>
  );
}

export default App;
