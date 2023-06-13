import React from "react";

import type { GetTodoResModel } from "../../pages/TodoList/hooks/useGetTodoList";

import Todo from "./Todo/Todo";

import classNames from "classnames/bind";
import style from "./style.module.scss";
import Modify from "./Modify/Modify";
const cx = classNames.bind(style);

type Props = {
  inputTodo: string;
  updateIdx: number;
  todoList: Array<GetTodoResModel>;
  onChangeTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateTodo: () => void;
  onClickUpdate: (idx: number) => void;
};

function TodoListContents({
  todoList = [],
  inputTodo,
  updateIdx,
  onChangeTodo,
  onCreateTodo,
  onClickUpdate,
}: Props) {
  console.log(updateIdx);
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
          const { id, todo, isCompleted, userId } = model;
          return (
            <li key={`${idx}-${id}`} className={cx("todo")}>
              {idx === updateIdx ? (
                <Modify onClickUpdate={onClickUpdate} />
              ) : (
                <Todo
                  idx={idx}
                  isCompleted={isCompleted}
                  onClickUpdate={onClickUpdate}
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
