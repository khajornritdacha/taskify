import './style.css'

import { useEffect, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'

import { ActionTodo, Todo } from '../models/model'
import { deleteTodo, editTodo } from './todoHandle'

interface Props {
  index: number
  todo: Todo
  todos: Todo[]
  dispatchTodo: React.Dispatch<ActionTodo>
  cat: string
}

const SingleTodo: React.FC<Props> = ({
  index,
  todo,
  todos,
  dispatchTodo,
  cat,
}) => {
  const [editOn, setEditOn] = useState<boolean>(false)
  const [editText, setEditText] = useState<string>(todo.todoText)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDone = (id: number) => {
    if (editOn) return

    dispatchTodo({
      type: 'done',
      id,
    })
  }

  const handleDelete = (id: number) => {
    deleteTodo(id, dispatchTodo, cat, todos)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setEditOn(false)
    editTodo(todo.id, editText, dispatchTodo, cat)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [editOn])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleSubmit(e)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {editOn ? (
            <input
              type="text"
              className="todos__single--text"
              value={editText}
              ref={inputRef}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todoText}</s>
          ) : (
            <span className="todos__single--text">{todo.todoText}</span>
          )}
          <div>
            {!editOn && !todo.isDone && (
              <span className="icon" onClick={() => setEditOn(true)}>
                <AiFillEdit />
              </span>
            )}
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span
              className="icon"
              onClick={
                editOn ? (e) => handleSubmit(e) : () => handleDone(todo.id)
              }
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo
