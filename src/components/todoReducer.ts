import { Todo, ActionTodo } from "../models/model";

export function todoReducer(todos: Todo[], action: ActionTodo) {
  switch (action.type) {
    case "add": {
      return [
        ...todos,
        {
          id: Date.now(),
          todoText: action.todoText,
          isDone: action.isDone,
        },
      ];
    }
    case "done": {
      return todos.map((item) => {
        return item.id === action.id ? { ...item, isDone: !item.isDone } : item;
      });
    }
    case "delete": {
      return todos.filter((item) => item.id !== action.id);
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
