"use client";
import axios, { AxiosResponse } from "axios";
import styles from "./userInfoBlock.module.scss";
import { useQuery } from "@tanstack/react-query";
import { IResponseSignIn } from "@/type/TypeSignIn";
import { useCustomDispatch, useCustomSelector } from "@/hooks/redux";
import { clearUserData, writeData } from "@/store/account/accountSlice";
import { useState } from "react";

export const UserInfoBlock = () => {
  const dispatch = useCustomDispatch();
  const reduxUserInfo = useCustomSelector((state) => state.accountRoot);

  const [g, setG] = useState("");

  const getUserInfo = async () => {
    const { data }: AxiosResponse<IResponseSignIn> = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_SIGN_IN}`,
      {
        emailOrLogin: reduxUserInfo.login,
        password: reduxUserInfo.password,
      }
    );
    if (data.error === false) {
      dispatch(
        writeData({
          login: data.okBody.uniqueName,
          name: data.okBody.name,
          surname: data.okBody.surname,
          email: data.okBody.email,
          password: data.okBody.password,
        })
      );
    } else {
      localStorage.setItem("login", "");
      localStorage.setItem("name", "");
      localStorage.setItem("surname", "");
      localStorage.setItem("email", "");
      localStorage.setItem("password", "");
      dispatch(clearUserData());
      window.location.reload();
    }
    return data;
  };

  if (
    reduxUserInfo.password === "" ||
    reduxUserInfo.email === "" ||
    reduxUserInfo.login === ""
  ) {
    return (
      <div className="wrapper">
        <h1 className={styles.no_auhtorization}>Вы не вошли</h1>
      </div>
    );
  }

  const data = useQuery({ queryKey: ["userGetInfo"], queryFn: getUserInfo });
  
  const p = (e: React.ChangeEvent<HTMLInputElement>, text: "login") => {
    if (text === "login") {
      const p = document.querySelector("#widthChange") as HTMLParagraphElement;
      p.innerText = e.currentTarget.value
      const width = document.querySelector("#widthChange")?.getBoundingClientRect().width || 0;
      const element = document.querySelector("#loginChange") as HTMLInputElement;
      element.style.width = width + 'px'
     setG(e.currentTarget.value)
    }
  };
  if (data.data?.error === false) {
    return (
      <div className="wrapper">
        <h1 className={styles.header}>Ваши данные:</h1>
        <span id="widthChange" className={styles.width_check}>g</span>
        <span className={styles.info_block}>
          Логин: 
        </span>
        <input
          id="loginChange"
          className={styles.input}
          onChange={(e) => p(e, "login")}
          type="text"
          value={g}
        />
        <p className={styles.info_block}>Почта: {data.data.okBody.email}</p>
        <p className={styles.info_block}>Имя: {data.data.okBody.name}</p>
        <p className={styles.info_block}>Фамилия: {data.data.okBody.surname}</p>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <h1 className={styles.header}>Вы не вошли</h1>
    </div>
  );
};
