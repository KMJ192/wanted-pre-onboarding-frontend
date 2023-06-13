import React, { useState } from "react";
import { fetcher } from "../../../network/api";

function useCreateTodo() {
  const [todo, setTodo] = useState("");

  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const onCreateTodo = async () => {
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
    onCreateTodo,
  };
}

export default useCreateTodo;
