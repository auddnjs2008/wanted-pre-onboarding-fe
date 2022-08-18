import { useState } from "react";

const useFetch = (method, url) => {
  const api = process.env.REACT_APP_API_URL;

  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = (body = "", urlId = "") => {
    setState((prev) => ({ ...prev, loading: true }));

    const fetchOption = {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("todoToken"))?.access_token,
      },
    };

    if (method === "GET" || method === "DELETE") delete fetchOption.body;

    fetch(api + url + `/${urlId}`, fetchOption)
      .then((result) => (method === "DELETE" ? result : result.json()))
      .then((data) => {
        data.statusCode >= 400
          ? setState({ ...state, loading: false, error: data.message })
          : setState({ ...state, loading: false, data });
      })
      .catch((error) => setState({ ...state, loading: false, error }));
  };
  return [mutate, { ...state }, setState];
};

export default useFetch;
