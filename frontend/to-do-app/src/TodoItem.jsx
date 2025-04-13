import React, {useState} from "react"
const API_Base = 'http://localhost:3000/todo'

function TodoItem(props) {

    
    return (
        <div className="todo-item">
            <input type="checkbox" className="todo-checkbox" />
            <span className="todo-text">{props.name}</span>
            <div className="todo-actions">
                <button className="edit-button" aria-label="Edit task">
                    <span>✎</span>
                </button>
                <button className="delete-button" aria-label="Delete task">
                    <span>&times;</span>
                </button>
            </div>
        </div>
    )
}

export default TodoItem
