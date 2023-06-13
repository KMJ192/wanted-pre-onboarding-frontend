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

function SignInContents({
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
      <div className={cx("title")}>로그인</div>
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
            data-testid="signin-button"
            onClick={onSubmit}
            disabled={!isValidate}
          >
            로그인
          </button>
          <button
            className={cx("button", "sign-up")}
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInContents;
