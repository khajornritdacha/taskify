import './style.css'
import { Todo, ActionTodo } from '../models/model'
import SingleTodo from './SingleTodo'

interface Props {
  todos: Todo[]
  dispatchTodo: React.Dispatch<ActionTodo>
  toRemoves: Todo[]
  dispatchToRemove: React.Dispatch<ActionTodo>
}

const TodoList: React.FC<Props> = ({
  todos,
  dispatchTodo,
  toRemoves,
  dispatchToRemove,
}) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">Active Tasks</span>
        {todos.map((todo) => {
          return (
            <SingleTodo
              key={todo.id}
              todo={todo}
              todos={todos}
              dispatchTodo={dispatchTodo}
            />
          )
        })}
      </div>
      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>
        {toRemoves.map((todo) => {
          return (
            <SingleTodo
              key={todo.id}
              todo={todo}
              todos={toRemoves}
              dispatchTodo={dispatchToRemove}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TodoList
