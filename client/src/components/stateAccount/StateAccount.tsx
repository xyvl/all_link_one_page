"use client";
import Link from "next/link";
import React from "react";
import styles from "./stateAccount.module.scss";
import { useCustomSelector } from "@/hooks/redux";

export const StateAccount = () => {
  const user = useCustomSelector((state) => state.accountRoot);
  if (user.email == "" || user.password == "") {
    return (
      <>
        <Link className="standart_link" href="/sign_in">
          Войти
        </Link>
        <Link className="standart_link" href="/sign_up">
          Зарегистрироваться
        </Link>
      </>
    );
  }
  return (
    <div>
      <Link className="standart_link" href="/">
        Выйти
      </Link>
    </div>
  );
};
