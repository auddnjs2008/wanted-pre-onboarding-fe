import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useFetch from "../../lib/useFetch";
import useLogin from "../../lib/useLogin";
import {
  Form,
  InnerWrapper,
  Input,
  SignUpBtn,
  SubmitBtn,
  Wrapper,
} from "./style";

const Auth = () => {
  const [authState, setAuthState] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginToken, setLoginToken] = useLogin();
  const navigate = useNavigate();
  const [
    signInMutate,
    { data: signInData, loading: signInLoading, error: signInError },
  ] = useFetch("POST", "/auth/signin");

  const [
    signUpMutate,
    { data: signUpData, loading: signUpLoading, error: signUpError },
  ] = useFetch("POST", "/auth/signup");

  const onAuthStateChangeClick = useCallback(() => {
    if (authState === "signIn") setAuthState("signUp");
    else if (authState === "signUp") setAuthState("signIn");
  }, [authState]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const validEmail = isValidEmail(email);
      const validPassword = isValidPassword(password);
      authAlert(validEmail, validPassword);
      if (!validEmail || !validPassword) return;

      if (authState === "signIn") {
        signInMutate({ email, password });
      } else if (authState === "signUp") {
        signUpMutate({ email, password });
      }
    },
    [email, password]
  );

  const isValidEmail = useCallback((email) => {
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regEmail.test(email);
  }, []);

  const isValidPassword = useCallback((password) => {
    return password.length >= 8;
  }, []);

  const authAlert = useCallback((validEmail, validPassword) => {
    if (!validEmail) alert("이메일을 다시 써주세요 @을 꼭 포함시켜 주세요!");
    if (!validPassword) alert("패스워드는 8자 이상 입력해주세요");
  }, []);

  const onEmailChange = useCallback(
    (e) => {
      const text = e.currentTarget.value;
      setEmail(text);
    },
    [email]
  );

  const onPasswordChange = useCallback(
    (e) => {
      const text = e.currentTarget.value;
      setPassword(text);
    },
    [password]
  );

  useEffect(() => {
    if (signUpData || signInData) {
      localStorage.setItem(
        "todoToken",
        JSON.stringify(signUpData || signInData)
      );
      setLoginToken(signUpData || signInData);
      window.location.href = "/todo";
    }
  }, [signUpData, signInData, navigate]);

  useEffect(() => {
    if (signInError || signUpError) {
      alert(signInError || signUpError);
    }
  }, [signInError, signUpError]);

  return (
    <Wrapper>
      <InnerWrapper>
        <h1>{authState === "signIn" ? "로그인" : "회원가입"}</h1>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onEmailChange}
            autoComplete="off"
            value={email}
            type="email"
            placeholder="email을 입력해주세요"
          />
          <Input
            onChange={onPasswordChange}
            value={password}
            autoComplete="off"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <SubmitBtn>Submit</SubmitBtn>
        </Form>
        <SignUpBtn onClick={onAuthStateChangeClick}>
          {authState === "signIn" ? "회원가입" : "로그인"}하기
        </SignUpBtn>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Auth;
