import './style.css'
import { Todo, ActionTodo } from '../models/model'
import SingleTodo from './SingleTodo'

interface Props {
  todos: Todo[]
  dispatchTodo: React.Dispatch<ActionTodo>
}

const TodoList: React.FC<Props> = ({ todos, dispatchTodo }) => {
  //   console.log(todos)
  return (
    <div className="container">
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
  )
}

export default TodoList
