import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignUpContents from "../../pageContents/SignUpContents/SignUpContents";

import { fetcher } from "../../network/api";

function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [isValidate, setIsValidate] = useState(false);

  const validationChecker = (email: string, password: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) && password.length >= 8) {
      setIsValidate(true);
      return;
    }
    setIsValidate(false);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    validationChecker(email, userInfo.password);
    setUserInfo({
      ...userInfo,
      email,
    });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    validationChecker(userInfo.email, password);
    setUserInfo({
      ...userInfo,
      password,
    });
  };

  const onSubmit = async () => {
    const { email, password } = userInfo;
    const response = await fetcher({
      method: "POST",
      url: "/auth/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });

    const { isSuccess } = response;
    if (isSuccess) {
      setUserInfo({
        email: "",
        password: "",
      });

      navigate("/signin");
    }

    if (response.message.length > 0) {
      alert(response.message);
      return;
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/todo");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SignUpContents
      email={userInfo.email}
      password={userInfo.password}
      isValidate={isValidate}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
    />
  );
}

export default SignUp;
