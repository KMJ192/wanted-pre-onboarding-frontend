import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./style.module.scss";
const cx = classNames.bind(style);

type Props = {
  email: string;
  password: string;
  isValidate: boolean;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

function SignUpContents({
  email,
  password,
  isValidate,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>회원 가입</div>
      <div className={cx("contents")}>
        <input
          className={cx("input")}
          placeholder="email"
          type="text"
          data-testid="email-input"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          className={cx("input")}
          placeholder="password"
          type="password"
          data-testid="password-input"
          value={password}
          onChange={onChangePassword}
        />
        <div className={cx("buttons")}>
          <button
            className={cx("button", "submit")}
            data-testid="signup-button"
            onClick={onSubmit}
            disabled={!isValidate}
          >
            회원가입
          </button>
          <button
            className={cx("button", "sign-up")}
            onClick={() => {
              navigate("/signin");
            }}
          >
            로그인 하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpContents;
