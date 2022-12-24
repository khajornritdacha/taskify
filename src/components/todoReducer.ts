import { Todo, ActionTodo } from "../models/model";

export function todoReducer(todos: Todo[], action: ActionTodo) {
  switch (action.type) {
    case "initialize": {
      if (!action.todos) return [];
      return action.todos;
    }
    case "add": {
      return [
        ...todos,
        {
          id: action.id,
          todoText: action.todoText,
          isDone: action.isDone,
        },
      ];
    }
    case "insert": {
      const newTodos = [...todos];
      newTodos.splice(action.index, 0, action.item);
      return newTodos;
    }
    case "done": {
      return todos.map((item) => {
        return item.id === action.id ? { ...item, isDone: !item.isDone } : item;
      });
    }
    case "delete": {
      // console.log(action.id);
      // console.log(todos);
      return todos.filter((item) => {
        // if (item.id === action.id) console.log("Found");
        return item.id !== action.id;
      });
    }
    case "edit": {
      return todos.map((item) =>
        item.id === action.id ? { ...item, todoText: action.editText } : item
      );
    }
    default: {
      return todos;
    }
  }
}
