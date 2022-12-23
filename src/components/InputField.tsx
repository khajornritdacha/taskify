import React, { useRef } from 'react'
import './style.css'

interface Props {
  todoText: string
  setTodoText: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({ todoText, setTodoText, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="input"
      onSubmit={(e) => {
        inputRef.current?.blur()
        handleAdd(e)
      }}
    >
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter a task"
        className="input__box"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  )
}

export default InputField
