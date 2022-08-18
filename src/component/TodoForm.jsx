import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useFetch from "../lib/useFetch";

const Form = styled.form`
  width: 100%;
  border-bottom: 2px solid black;
  display: flex;
  margin-bottom: 2rem;
`;
const Input = styled.input`
  all: unset;
  flex: 1;
  height: 2rem;
  font-size: 1rem;
  padding: 1px 10px;
`;
const Button = styled.button`
  all: unset;
  height: 2rem;
  width: 2rem;
  padding: 1px 2px;
  margin-bottom: 2px;
  border: 1px solid black;
`;

const TodoForm = ({ setTodos }) => {
  const [create, { data, loading, error }] = useFetch("POST", "/todos");
  const [todo, setTodo] = useState("");

  const onChange = useCallback(
    (e) => {
      const text = e.currentTarget.value;
      setTodo(text);
    },
    [todo]
  );

  const onSubmit = useCallback(
    (e) => {
      if (loading || todo === "") return;
      e.preventDefault();
      create({ todo });
      setTodo("");
    },
    [todo]
  );

  useEffect(() => {
    if (!data) return;
    setTodos((prev) => {
      if (!prev) return;
      return { ...prev, data: prev.data ? [...prev.data, data] : [data] };
    });
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <Form onSubmit={onSubmit}>
      <Input
        onChange={onChange}
        type="text"
        value={todo}
        placeholder="할 일을 입력해주세요"
      />
      <Button>추가</Button>
    </Form>
  );
};

export default TodoForm;
