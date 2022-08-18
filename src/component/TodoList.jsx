import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useFetch from "../lib/useFetch";
import TodoFixItem from "./TodoFixItem";
import TodoItem from "./TodoItem";

const Ul = styled.ul`
  height: 50%;
  flex: 1;
  overflow: auto;
`;

const TodoList = ({ todos, setTodos }) => {
  const [fixId, setFixId] = useState(-1);
  const [updateTodos, { data, loading, error }] = useFetch("PUT", `/todos`);
  const [
    deleteTodo,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useFetch("DELETE", `/todos`);

  const onFixBtnClick = useCallback(
    (e) => {
      const fixindex = e.target.dataset.fixindex;
      if (!fixindex) return;
      setFixId(+fixindex);
    },
    [fixId]
  );

  const onFixCancle = useCallback((e) => {
    const {
      dataset: { fixcancel },
    } = e.target;
    if (!fixcancel) return;
    setFixId(-1);
  }, []);

  const onCompleteClick = useCallback(
    (e) => {
      const {
        dataset: { completeindex },
      } = e.target;
      if (!completeindex) return;
      e.target.clicked = !e.target.clicked;

      const todo = todos.find((todo) => todo.id === +completeindex);
      updateTodos({ ...todo, isCompleted: !todo.isCompleted }, completeindex);
      setTodos((prev) => ({
        ...prev,
        data: prev.data.map((item) =>
          item.id === +completeindex
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        ),
      }));
    },
    [todos]
  );

  const onDeleteClick = useCallback(
    (e) => {
      const {
        dataset: { delindex },
      } = e.target;

      if (!delindex) return;
      deleteTodo("", delindex);
      setTodos((prev) => ({
        ...prev,
        data: prev.data.filter((item) => item.id !== +delindex),
      }));
    },
    [todos]
  );

  useEffect(() => {
    if (error || deleteError) {
      throw new Error(error || deleteError);
    }
  }, [error, deleteError]);

  return (
    <Ul
      onClick={(e) => {
        onFixBtnClick(e);
        onFixCancle(e);
        onCompleteClick(e);
        onDeleteClick(e);
      }}
    >
      {todos &&
        todos.map((todo) =>
          todo.id !== fixId ? (
            <TodoItem key={todo.id} todo={todo} />
          ) : (
            <TodoFixItem
              key={todo.id}
              setTodos={setTodos}
              setFixId={setFixId}
              todo={todo}
            />
          )
        )}
    </Ul>
  );
};

export default TodoList;
