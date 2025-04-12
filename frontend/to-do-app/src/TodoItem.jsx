function TodoItem() {
    return (
        <div className="todo-item">
            <input type="checkbox" className="todo-checkbox" />
            <span className="todo-text">Test</span>
            <button className="delete-button" aria-label="Delete task">
                <span>&times;</span>
            </button>
        </div>
    )
}

export default TodoItem
