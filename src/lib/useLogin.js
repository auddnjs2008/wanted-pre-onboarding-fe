import { useEffect, useState } from "react";

const useLogin = () => {
  const [loginToken, setLoginToken] = useState("");
  useEffect(() => {
    const tokenInfo = JSON.parse(localStorage.getItem("todoToken"));
    if (!tokenInfo) return;
    setLoginToken(tokenInfo.access_token);
  }, []);

  return [loginToken, setLoginToken];
};

export default useLogin;
