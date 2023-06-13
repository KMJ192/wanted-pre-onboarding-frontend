import React from "react";

import type { GetTodoResModel } from "../../pages/TodoList/hooks/useGetTodoList";

import Todo from "./Todo/Todo";
import Modify from "./Modify/Modify";

import classNames from "classnames/bind";
import style from "./style.module.scss";
const cx = classNames.bind(style);

type Props = {
  inputTodo: string;
  updateIdx: number;
  changedTodo: string;
  todoList: Array<GetTodoResModel>;
  onChangeTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateTodo: () => void;
  onClickUpdate: (idx: number) => void;
  onUpdate: (id: number, checked: boolean, todo: string) => void;
  onInit: (e: React.MouseEvent) => void;
  onChangeTodoInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
                  todo={todo}
                  isCompleted={isCompleted}
                  changedTodo={changedTodo}
                  onClickUpdate={onClickUpdate}
                  onUpdate={onUpdate}
                  onInit={onInit}
                  onChangeTodoInput={onChangeTodoInput}
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
