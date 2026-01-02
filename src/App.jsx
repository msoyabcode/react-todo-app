
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
    <div className='min-h-screen bg-gray-100  flex justify-center items-center'>
      <div className='bg-white w-full max-w-md p-6  rounded-lg shadow '>

        {/* \ Heading */}
      <h1 className='text-2xl font-bold text-center mb-4'>Todo App</h1>

       {/* Input + Button */}
      <div className='flex gap-2 mb-4'>
      <input
        type="text" 
        value={todo}
        onChange={handleChange} 
        placeholder='Enter a todo...'
        className='flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ' 
     />
      <button
       onClick={handleAdd}
       className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
       >{editId === null ? "Save": "update"}</button>
       </div>

          {/* Todo List */}
      <div className='space-y-2.5'>
        {todos.map(item =>{
          return  (
          <div key={item.id}
          className='flex justify-between bg-gray-100 p-3 rounded'>

            {/* Left */}
            <div className='flex gap-2'>
            <input
             type="checkbox" 
             checked = {item.isComplete}
             onChange={() => handleCheckbox(item.id)}
             className='w-4 h-4'
             />
            <span className={ item.isComplete? "line-through text-gray-400": "text-gray-800" }>{item.todo}</span>
            </div>

                  {/* Right */}
            <div className='flex gap-2'>
              <button onClick={()=>handleEdit(item.id)} className='text-blue-500 hover:underline '>Edit</button>
              <button onClick={()=>handleDelete(item.id)} className='text-red-500 hover:underline'>Delete</button>
            </div>
          </div>
          
          )
         })}
      </div>
      </div>
    </div>
  )
}
export default App 


