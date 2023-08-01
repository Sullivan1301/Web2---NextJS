// pages/todos.js
import { useState } from "react";

export default function Todos() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Entrer"){
      addTodo()
    }
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
    <div className="glass-container">
      <div className="app container">
      <h1>Todo List</h1>
      <div>
        <input type="text" value={newTodo} onChange={handleInputChange} onKeyPress = {handleKeyPress} />
        {editingIndex === -1 ? (
          <button className="add-button" onClick={addTodo}>Add</button>
        ) : (
          <>
            <button className="save-button" onClick={updateTodo}>Update</button>
            <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
          </>
        )}
      </div>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            {index === editingIndex ? (
              <input className="editing-button" type="text" value={newTodo} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
            ) : (
              todo
            )}
            {index === editingIndex ? (
              <>
                <button className="save-button" onClick={() => updateTodo(index)}>Save</button>
                <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <button className="edit-button" onClick={() => startEditing(index)}>Edit</button>
                <button className="remove-button" onClick={() => removeTodo(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
