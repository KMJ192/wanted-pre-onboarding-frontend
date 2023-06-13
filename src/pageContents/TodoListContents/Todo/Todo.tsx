import React from "react";

import classNames from "classnames/bind";
import style from "./style.module.scss";
const cx = classNames.bind(style);

type Props = {
  idx: number;
  isCompleted: boolean;
  onClickUpdate: (idx: number) => void;
};

function Todo({ idx, isCompleted, onClickUpdate }: Props) {
  return (
    <>
      <div className={cx("todo-left")}>
        <input type="checkbox" checked={isCompleted} readOnly></input>
        <input data-testid="modify-input"></input>
      </div>
      <div className={cx("todo-right")}>
        <button data-testid="modify-button" onClick={() => onClickUpdate(idx)}>
          수정
        </button>
        <button data-testid="cancel-button">삭제</button>
      </div>
    </>
  );
}

export default Todo;
