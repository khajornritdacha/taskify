import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { useState, useReducer } from 'react'
import { Todo } from './models/model'
import { todoReducer } from './components/todoReducer'

const App: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('')
  const [todos, dispatchTodo] = useReducer(todoReducer, [])

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault()

    dispatchTodo({
      type: 'add',
      id: Date.now(),
      todoText,
      isDone: false,
    })

    setTodoText('')
  }

  return (
    <>
      <main className="App">
        <span className="heading">Taskify</span>
        <InputField
          todoText={todoText}
          setTodoText={setTodoText}
          handleAdd={handleAdd}
        />
        <TodoList todos={todos} dispatchTodo={dispatchTodo} />
      </main>
    </>
  )
}

export default App
