import React, { useEffect, useState } from "react";
import TodoForm from "../../component/TodoForm";
import TodoList from "../../component/TodoList";
import useFetch from "../../lib/useFetch";
import { InnerWrapper, Wrapper } from "./style";

const Todo = () => {
  const [getTodos, { data, loading, error }, setTodos] = useFetch(
    "GET",
    "/todos"
  );

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <Wrapper>
      <InnerWrapper>
        <h1>ToDoList</h1>
        <TodoForm setTodos={setTodos} />
        <TodoList setTodos={setTodos} todos={data} />
      </InnerWrapper>
    </Wrapper>
  );
};

export default Todo;
