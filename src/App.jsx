
import React, {  useEffect, useState } from 'react'


const App = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(()=>{
   const savedTodos = localStorage.getItem("todos")
   return savedTodos? JSON.parse(savedTodos) : []
  })
  const [editId, setEditId] = useState(null)


  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleAdd = () =>{
    if(todo.trim() === ""){
      return alert("Please enter a todo")
    }

    if (editId===null){
    let newTodo = {
      id: Date.now(),
      todo: todo,
      isComplete: false
    }
    setTodos([...todos, newTodo])
  }else{
    const updatedTodos = todos.map(item =>{
      if(item.id === editId){
        return{...item, todo:todo}
      }
      return item
    })
    setTodos(updatedTodos)
    setEditId(null)
  }
    setTodo("")

  }

  const handleCheckbox = (id) =>{
    let newTodos = todos.map(item=>{
      if(item.id === id){
        return {...item, isComplete: !item.isComplete}
    }
    return item
    })
    setTodos(newTodos)
  }

  const handleDelete = (id) =>{
    let newTodos = todos.filter(item =>{
      return item.id !==id
    })
    setTodos(newTodos)
  }

  const handleEdit = (id) =>{
    const selectedTodo = todos.find(item => item.id ===id)
    setTodo(selectedTodo.todo)
    setEditId(id)
  }

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  return (
    <div>
      <h1>Todo App</h1>

      <input
        type="text" 
        value={todo}
        onChange={handleChange} 
     />
      <button onClick={handleAdd}>{editId === null ? "Save": "update"}</button>

      <div>
        {todos.map(item =>{
          return  (
          <div key={item.id}>
            <input
             type="checkbox" 
             checked = {item.isComplete}
             onChange={() => handleCheckbox(item.id)}
             />
            <span style={{ textDecoration: item.isComplete ? "line-through": "none"}}>{item.todo}</span>
              <button onClick={()=>handleDelete(item.id)}>Delete</button>
              <button onClick={()=>handleEdit(item.id)}>Edit</button>
          </div>
          
          )
        })}
      </div>
    </div>
  )
}
export default App 

