import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TodoListContents from "../../pageContents/TodoListContents/TodoListContents";

// API
import useGetTodoList from "./hooks/useGetTodoList";
import useCreateTodo from "./hooks/useCreateTodo";
import useUpdateTodo from "./hooks/useUpdateTodo";

function TodoList() {
  const navigate = useNavigate();

  const { todoList, refetch } = useGetTodoList();
  const { inputTodo, onChangeTodo, onCreateTodo } = useCreateTodo();
  const { updateIdx, onClickUpdate } = useUpdateTodo();

  const onCreate = async () => {
    const isSuccess = await onCreateTodo();
    if (isSuccess) {
      await refetch();
    }
  };

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TodoListContents
      todoList={todoList}
      inputTodo={inputTodo}
      updateIdx={updateIdx}
      onChangeTodo={onChangeTodo}
      onCreateTodo={onCreate}
      onClickUpdate={onClickUpdate}
    />
  );
}

export default TodoList;
