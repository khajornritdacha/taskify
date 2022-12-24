export interface Todo {
  id: number;
  todoText: string;
  isDone: boolean;
}

export type ActionTodo =
  | { type: "initialize"; todos: Todo[] }
  | { type: "add"; id: number; todoText: string; isDone: boolean }
  | { type: "insert"; index: number; item: Todo }
  | { type: "done"; id: number }
  | { type: "delete"; id: number }
  | { type: "edit"; editText: string; id: number };
