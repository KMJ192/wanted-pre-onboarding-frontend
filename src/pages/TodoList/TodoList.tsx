import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TodoListContents from "../../pageContents/TodoListContents/TodoListContents";

// API
import useGetTodoList from "./hooks/useGetTodoList";
import useCreateTodo from "./hooks/useCreateTodo";
import useUpdateTodo from "./hooks/useUpdateTodo";
import useDeleteTodo from "./hooks/useDeleteTodo";

function TodoList() {
  const navigate = useNavigate();

  const { todoList, refetch } = useGetTodoList();
  const { inputTodo, onChangeTodo, onCreateTodo } = useCreateTodo();
  const {
    updateIdx,
    changedTodo,
    onClickUpdate,
    onChangeTodoInput,
    onInit,
    update,
  } = useUpdateTodo({ todoList });
  const { deleteTodo } = useDeleteTodo();

  const onCreate = async () => {
    const isSuccess = await onCreateTodo();
    if (isSuccess) {
      refetch();
    }
  };

  const onUpdate = async (id: number, checked: boolean, todo: string) => {
    const isSuccess = await update(id, checked, todo);
    if (isSuccess) {
      refetch();
    }
  };

  const onDelete = async (id: number) => {
    const isSuccess = await deleteTodo(id);
    if (isSuccess) {
      refetch();
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
      changedTodo={changedTodo}
      onChangeTodo={onChangeTodo}
      onCreateTodo={onCreate}
      onClickUpdate={onClickUpdate}
      onChangeTodoInput={onChangeTodoInput}
      onInit={onInit}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}

export default TodoList;
