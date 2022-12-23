import './style.css'
import { Todo, ActionTodo } from '../models/model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'

interface Props {
  todo: Todo
  todos: Todo[]
  dispatchTodo: React.Dispatch<ActionTodo>
}

const SingleTodo: React.FC<Props> = ({ todo, todos, dispatchTodo }) => {
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
    dispatchTodo({
      type: 'delete',
      id,
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setEditOn(false)
    dispatchTodo({
      type: 'edit',
      editText,
      id: todo.id,
    })
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [editOn])

  return (
    <form className="todos__single" onSubmit={(e) => handleSubmit(e)}>
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
        {!editOn && (
          <span className="icon" onClick={() => setEditOn(true)}>
            <AiFillEdit />
          </span>
        )}
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo
