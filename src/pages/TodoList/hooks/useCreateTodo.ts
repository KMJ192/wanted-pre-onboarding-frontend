import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetcher } from "../../../network/api";

type UseCreateTodo = {
  inputTodo: string;
  onChangeTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateTodo: () => boolean;
};

function useCreateTodo() {
  const navigate = useNavigate();

  const [todo, setTodo] = useState("");

  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const create = async () => {
    const token = window.localStorage.getItem("token");

    const response = await fetcher({
      method: "POST",
      url: "/todos",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        todo,
      },
    });

    const { isSuccess, message, status } = response;

    if (status === 401) {
      window.localStorage.removeItem("token");
      navigate("/signin");
      return;
    }

    if (status !== 201 || !isSuccess) {
      alert(message || "Network Error");
      return false;
    }
    setTodo("");

    return true;
  };

  return {
    inputTodo: todo,
    onChangeTodo,
    create,
  };
}

export type { UseCreateTodo };
export default useCreateTodo;
