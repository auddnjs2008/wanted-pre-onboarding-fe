import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerWrapper = styled.div`
  width: 20rem;
  height: 20rem;
  border: 1px solid black;
  position: relative;
  padding: 1rem;
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  button:active {
    transform: scale(0.98);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  all: unset;
  height: 3rem;
  width: 19rem;
  border: 1px solid black;
  margin-bottom: 0.5rem;
  padding: 0 0.5em;
  &::placeholder {
    padding: 0.5rem;
  }
`;

export const SubmitBtn = styled.button`
  all: unset;
  width: 100%;
  height: 2rem;
  text-align: center;
  border: 1px solid black;
`;

export const SignUpBtn = styled.button`
  all: unset;
  width: 7rem;
  height: 1.5rem;
  text-align: center;
  border: 1px solid black;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
