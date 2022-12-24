import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { useState, useReducer } from 'react'
import { todoReducer } from './components/todoReducer'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('')
  const [todos, dispatchTodo] = useReducer(todoReducer, [])
  const [toRemoves, dispatchToRemove] = useReducer(todoReducer, [])

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

  const onDragEnd = (result: DropResult) => {
    // console.log(result)
    const { source, destination } = result

    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    let item
    if (source.droppableId === 'TodosList') {
      item = todos[source.index]
      dispatchTodo({
        type: 'delete',
        id: item.id,
      })
    } else {
      item = toRemoves[source.index]
      dispatchToRemove({
        type: 'delete',
        id: item.id,
      })
    }

    console.log(item)
    if (destination.droppableId === 'TodosList') {
      dispatchTodo({
        type: 'add',
        ...item,
      })
    } else {
      dispatchToRemove({
        type: 'add',
        ...item,
      })
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="App">
          <span className="heading">Taskify</span>
          <InputField
            todoText={todoText}
            setTodoText={setTodoText}
            handleAdd={handleAdd}
          />
          <TodoList
            todos={todos}
            dispatchTodo={dispatchTodo}
            toRemoves={toRemoves}
            dispatchToRemove={dispatchToRemove}
          />
        </main>
      </DragDropContext>
    </>
  )
}

export default App
