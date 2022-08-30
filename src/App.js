import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GlobalStyle from "./component/GlobalStyle";
import useLogin from "./lib/useLogin";
import Auth from "./page/Auth";
import Todo from "./page/Todo";

function App() {
  const [loginToken, setLoginToken] = useLogin();

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            loginToken ? (
              <Navigate to="/todo"></Navigate>
            ) : (
              <Auth setLoginToken={setLoginToken} />
            )
          }
        />
        <Route
          path="/todo"
          element={!loginToken ? <Navigate to="/"></Navigate> : <Todo />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
