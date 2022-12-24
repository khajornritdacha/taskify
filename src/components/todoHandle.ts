import { Todo, ActionTodo } from "../models/model";
import { api } from "../utils/axios";

export function addTodo(
  newItem: Todo,
  dispatch: (value: ActionTodo) => void,
  cat: string
): void {
  try {
    const postNewItem = async () => {
      const res = await api.post("/add", {
        cat,
        data: newItem,
      });
      console.log(res);
    };
    postNewItem();

    dispatch({
      type: "add",
      ...newItem,
    });
  } catch (err) {
    console.log(err);
  }
}

export function deleteTodo(
  id: number,
  dispatch: (value: ActionTodo) => void,
  cat: string,
  debug: Todo[]
) {
  try {
    const deleteItem = async () => {
      const res = await api.post("/delete", {
        cat,
        id,
      });
      console.log(res);
    };
    deleteItem();

    dispatch({
      type: "delete",
      id,
    });
  } catch (err) {
    console.log(err);
  }

  console.log("After Dispatch");
  console.log(debug);
}

export function editTodo(
  id: number,
  editText: string,
  dispatch: (value: ActionTodo) => void,
  cat: string
) {
  try {
    const editItem = async () => {
      const res = await api.put("/edit", {
        cat,
        id,
        editText,
      });
      console.log(res);
    };
    editItem();

    dispatch({
      type: "edit",
      editText,
      id,
    });
  } catch (err) {
    console.log(err);
  }
}
