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

  const { refetchTodoList, ...getTodo } = useGetTodoList();
  const { create, ...createTodo } = useCreateTodo();
  const { update, ...updateTodo } = useUpdateTodo({
    todoList: getTodo.todoList,
  });
  const { deleteTodo } = useDeleteTodo();

  const onCreate = async () => {
    const isSuccess = await create();
    if (isSuccess) {
      refetchTodoList();
    }
  };

  const onUpdate = async (id: number, checked: boolean, todo: string) => {
    const isSuccess = await update(id, checked, todo);
    if (isSuccess) {
      refetchTodoList();
    }
  };

  const onDelete = async (id: number) => {
    const isSuccess = await deleteTodo(id);
    if (isSuccess) {
      refetchTodoList();
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
      {...getTodo}
      {...createTodo}
      {...updateTodo}
      onCreateTodo={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}

export default TodoList;
