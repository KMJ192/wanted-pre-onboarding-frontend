import React from "react";

import classNames from "classnames/bind";
import style from "./style.module.scss";
const cx = classNames.bind(style);

type Props = {
  idx: number;
  id: number;
  todo: string;
  isCompleted: boolean;
  onClickUpdate: (idx: number) => void;
  onUpdate: (id: number, checked: boolean, todo: string) => void;
  onDelete: (id: number) => void;
};

function Todo({
  idx,
  id,
  todo,
  isCompleted,
  onClickUpdate,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <>
      <div className={cx("todo-left")}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => {
            onUpdate(id, !isCompleted, todo);
          }}
          readOnly
        ></input>
        <span>{todo}</span>
      </div>
      <div className={cx("todo-right")}>
        <button data-testid="modify-button" onClick={() => onClickUpdate(idx)}>
          수정
        </button>
        <button data-testid="delete-button" onClick={() => onDelete(id)}>
          삭제
        </button>
      </div>
    </>
  );
}

export default Todo;
