import classNames from "classnames/bind";
import style from "./style.module.scss";
const cx = classNames.bind(style);

type Props = {
  onClickUpdate: (idx: number) => void;
};

function Modify({ onClickUpdate }: Props) {
  return (
    <>
      <div className={cx("todo-left")}>
        <input type="checkbox" checked={false} readOnly></input>
        <input data-testid="modify-input"></input>
      </div>
      <div className={cx("todo-right")}>
        <button
          data-testid="modify-button"
          onClick={() => {
            onClickUpdate(-1);
          }}
        >
          제출
        </button>
        <button data-testid="cancel-button" onClick={() => onClickUpdate(-1)}>
          취소
        </button>
      </div>
    </>
  );
}

export default Modify;
