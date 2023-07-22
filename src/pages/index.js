// pages/todos.js
import { useState } from "react";

export default function Todos() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodoList([...todoList, newTodo]);
      setNewTodo("");
    }
  };

  const removeTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setNewTodo(todoList[index]);
  };

  const updateTodo = () => {
    if (editingIndex !== -1 && newTodo.trim() !== "") {
      const updatedTodoList = [...todoList];
      updatedTodoList[editingIndex] = newTodo;
      setTodoList(updatedTodoList);
      setNewTodo("");
      setEditingIndex(-1);
    }
  };

  const cancelEditing = () => {
    setNewTodo("");
    setEditingIndex(-1);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" value={newTodo} onChange={handleInputChange} />
        {editingIndex === -1 ? (
          <button onClick={addTodo}>Add</button>
        ) : (
          <>
            <button onClick={updateTodo}>Update</button>
            <button onClick={cancelEditing}>Cancel</button>
          </>
        )}
      </div>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            {index === editingIndex ? (
              <input type="text" value={newTodo} onChange={handleInputChange} />
            ) : (
              todo
            )}
            {index === editingIndex ? (
              <>
                <button onClick={() => updateTodo(index)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => removeTodo(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
