export interface Todo {
  id: number;
  todoText: string;
  isDone: boolean;
}

export type ActionTodo =
  | { type: "add"; id: number; todoText: string; isDone: boolean }
  | { type: "done"; id: number }
  | { type: "delete"; id: number }
  | { type: "edit"; editText: string; id: number };
