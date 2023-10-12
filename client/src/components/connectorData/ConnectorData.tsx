import { useCustomDispatch } from "@/hooks/redux";
import { writeData } from "@/store/account/accountSlice";
import React, { useEffect, useState } from "react";
import { Spinner } from "../spinner/Spinner";

export const ConnectorData = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useCustomDispatch();
  const [theme, setTheme] = useState<boolean>(false);
  useEffect(() => {
    let login = localStorage.getItem("login") || "";
    let name = localStorage.getItem("name") || "";
    let surname = localStorage.getItem("surname") || "";
    let email = localStorage.getItem("email") || "";
    let password = localStorage.getItem("password") || "";
    dispatch(
      writeData({
        login,
        name,
        surname,
        email,
        password,
      })
    );
    let theme: string = localStorage.getItem("theme") || "";
    if(theme === 'dark'){
      document.documentElement.dataset.theme = "dark";
    }else{
      document.documentElement.dataset.theme = "light";
    }
    setTheme(true);
  }, []);
  if (theme === false) {
    return <Spinner />;
  }
  return <div>{children}</div>;
};
