import classNames from "classnames/bind";
import style from "./style.module.scss";
const cx = classNames.bind(style);

type Props = {
  id: number;
  todo: string;
  isCompleted: boolean;
  changedTodo: string;
  onClickUpdate: (idx: number) => void;
  onChangeTodoInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: (id: number, checked: boolean, todo: string) => void;
  onInit: (e: React.MouseEvent) => void;
};

function Modify({
  id,
  todo,
  isCompleted,
  changedTodo,
  onChangeTodoInput,
  onClickUpdate,
  onUpdate,
  onInit,
}: Props) {
  return (
    <>
      <div className={cx("todo-left")}>
        <input type="checkbox" checked={false} readOnly></input>
        <input
          data-testid="modify-input"
          value={changedTodo}
          onChange={onChangeTodoInput}
        ></input>
      </div>
      <div className={cx("todo-right")}>
        <button
          data-testid="submit-button"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onUpdate(id, isCompleted, changedTodo);
            onInit(e);
          }}
        >
          제출
        </button>
        <button data-testid="cancel-button" onClick={onInit}>
          취소
        </button>
      </div>
    </>
  );
}

export default Modify;
