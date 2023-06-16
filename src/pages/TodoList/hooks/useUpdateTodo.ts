import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetcher } from "../../../network/api";

import type { GetTodoResModel } from "./useGetTodoList";

type UseUpdateTodo = {
  updateIdx: number;
  changedTodo: string;
  onClickUpdate: (idx: number) => void;
  onChangeTodoInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInit: (e: React.MouseEvent) => void;
  update: (id: number, checked: boolean, todo: string) => void;
};

type Props = {
  todoList: Array<GetTodoResModel>;
};

function useUpdateTodo({ todoList }: Props) {
  const navigate = useNavigate();

  const [updateIdx, setUpdateIdx] = useState(-1);
  const [changedTodo, setChangedTodo] = useState("");

  const onClickUpdate = (idx: number) => {
    setUpdateIdx(idx);
    setChangedTodo(todoList[idx].todo);
  };

  const onChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedTodo(e.target.value);
  };

  const onInit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpdateIdx(-1);
    setChangedTodo("");
  };

  const update = async (id: number, isCompleted: boolean, todo: string) => {
    const token = window.localStorage.getItem("token");

    const response = await fetcher({
      method: "PUT",
      url: `todos/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        todo,
        isCompleted,
      },
    });
    const { status, isSuccess, message } = response;

    if (status === 401) {
      window.localStorage.removeItem("token");
      navigate("/signin");
      return;
    }

    if (status !== 200 || !isSuccess) {
      alert(message || "Network Error");
      return false;
    }

    return true;
  };

  return {
    updateIdx,
    changedTodo,
    onClickUpdate,
    onChangeTodoInput,
    onInit,
    update,
  };
}

export type { UseUpdateTodo };
export default useUpdateTodo;
