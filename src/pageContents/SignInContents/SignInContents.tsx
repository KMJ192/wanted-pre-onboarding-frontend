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
          value={email}
          onChange={onChangeEmail}
          data-testid="email-input"
        />
        <input
          className={cx("input")}
          placeholder="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          data-testid="password-input"
        />
        <div className={cx("buttons")}>
          <button
            className={cx("button", "submit")}
            onClick={onSubmit}
            disabled={!isValidate}
            data-testid="signin-button"
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
