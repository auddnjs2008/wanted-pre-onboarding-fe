import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useFetch from "../lib/useFetch";

const Li = styled.li`
  margin-bottom: 1rem;
  font-size: large;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  input {
    outline: none;
    flex: 1;
    font-size: large;
  }
`;

const ButtonWrapper = styled.div`
  button {
    all: unset;
    border: 1px solid black;
    padding: 5px;
    font-size: small;
    margin-left: 3px;
    &:active {
      transform: scale(0.98);
    }
  }
`;

const TodoFixItem = ({ todo, setTodos, setFixId }) => {
  const [fixTodo, setFixTodo] = useState(todo.todo);
  const [updateTodos, { data, loading, error }] = useFetch(
    "PUT",
    `/todos/${todo.id}`
  );

  const onChange = useCallback(
    (e) => {
      const text = e.currentTarget.value;
      setFixTodo(text);
    },
    [fixTodo]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (fixTodo === "" || loading) return;
      updateTodos({ todo: fixTodo, isCompleted: todo.isCompleted });
    },
    [fixTodo, todo]
  );

  useEffect(() => {
    if (!data) return;
    setTodos((prev) => ({
      ...prev,
      data: prev.data.map((item) => (item.id === data.id ? data : item)),
    }));
    setFixId(-1);
  }, [data]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <Li>
      <Form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={fixTodo} />
        <ButtonWrapper>
          <button>제출</button>
          <button type="button" data-fixcancel={todo.id}>
            취소
          </button>
        </ButtonWrapper>
      </Form>
    </Li>
  );
};

export default React.memo(TodoFixItem);
