import React from "react";
import styled from "styled-components";
import useFetch from "../lib/useFetch";

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: large;
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

const TodoWraapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const TodoItem = ({ todo }) => {
  return (
    <Li>
      <TodoWraapper>
        <span>{todo.todo}</span>
        <input
          type="checkbox"
          data-completeindex={todo.id}
          defaultChecked={todo.isCompleted}
        />
      </TodoWraapper>
      <ButtonWrapper>
        <button data-fixindex={todo.id}>수정</button>
        <button data-delindex={todo.id}>삭제</button>
      </ButtonWrapper>
    </Li>
  );
};

export default React.memo(TodoItem);
