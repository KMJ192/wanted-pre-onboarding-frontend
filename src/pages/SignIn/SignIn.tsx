import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignInContents from "../../pageContents/SignInContents/SignInContents";

import useSignIn from "./hooks/useSignIn";

function SignIn() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [isValidate, setIsValidate] = useState(false);

  const { signIn } = useSignIn();

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
    signIn(userInfo);
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/todo");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SignInContents
      email={userInfo.email}
      password={userInfo.password}
      isValidate={isValidate}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
    />
  );
}

export default SignIn;
