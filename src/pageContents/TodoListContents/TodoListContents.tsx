import React from "react";

import type { UseGetTodoList } from "../../pages/TodoList/hooks/useGetTodoList";
import type { UseCreateTodo } from "../../pages/TodoList/hooks/useCreateTodo";
import type { UseUpdateTodo } from "../../pages/TodoList/hooks/useUpdateTodo";

import Todo from "./Todo/Todo";
import Modify from "./Modify/Modify";

import classNames from "classnames/bind";
import style from "./style.module.scss";
const cx = classNames.bind(style);

type Props = Pick<UseGetTodoList, "todoList"> &
  Pick<UseCreateTodo, "inputTodo" | "onChangeTodo"> &
  Omit<UseUpdateTodo, "update"> & {
    onCreateTodo: () => void;
    onUpdate: (id: number, checked: boolean, todo: string) => void;
    onDelete: (id: number) => void;
  };

function TodoListContents({
  todoList = [],
  inputTodo,
  updateIdx,
  changedTodo,
  onChangeTodo,
  onCreateTodo,
  onClickUpdate,
  onUpdate,
  onInit,
  onChangeTodoInput,
  onDelete,
}: Props) {
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>Todo List</div>
      <div className={cx("add")}>
        <input
          className={cx("input")}
          value={inputTodo}
          onChange={onChangeTodo}
          data-testid="new-todo-input"
        ></input>
        <button
          className={cx("button")}
          onClick={onCreateTodo}
          data-testid="new-todo-add-button"
        >
          추가
        </button>
      </div>
      <ul className={cx("todo-list")}>
        {todoList.map((model, idx) => {
          const { id, todo, isCompleted } = model;
          return (
            <li key={`${idx}-${id}`} className={cx("todo")}>
              {idx === updateIdx ? (
                <Modify
                  id={id}
                  isCompleted={isCompleted}
                  changedTodo={changedTodo}
                  onUpdate={onUpdate}
                  onChangeTodoInput={onChangeTodoInput}
                  onInit={onInit}
                />
              ) : (
                <Todo
                  idx={idx}
                  id={id}
                  todo={todo}
                  isCompleted={isCompleted}
                  onClickUpdate={onClickUpdate}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoListContents;
