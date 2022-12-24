import './style.css'
import { Todo, ActionTodo } from '../models/model'
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd'
import { useStrictDroppable } from '../hooks/useStrictDroppable'

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
  const [enabled] = useStrictDroppable(false)

  return (
    <div className="container">
      {enabled && (
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Tasks</span>
              {todos.map((todo, index) => {
                return (
                  <SingleTodo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    dispatchTodo={dispatchTodo}
                    cat="todos"
                  />
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
      {enabled && (
        <Droppable droppableId="ToRemovesList">
          {(provided, snapshot) => (
            <div
              className={`todos ${
                snapshot.isDraggingOver ? 'dragcomplete' : 'remove'
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Completed Tasks</span>
              {toRemoves.map((todo, index) => {
                return (
                  <SingleTodo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    todos={toRemoves}
                    dispatchTodo={dispatchToRemove}
                    cat="toRemoves"
                  />
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  )
}

export default TodoList
