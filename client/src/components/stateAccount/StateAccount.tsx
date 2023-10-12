"use client";
import Link from "next/link";
import React from "react";
import { useCustomSelector } from "@/hooks/redux";

export const StateAccount = () => {
  const user = useCustomSelector((state) => state.accountRoot);
  if (user.login == "" || user.email == "" || user.password == "") {
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

  const goOut = () => {
    localStorage.setItem("login", "");
    localStorage.setItem("name", "");
    localStorage.setItem("surname", "");
    localStorage.setItem("email", "");
    localStorage.setItem("password", "");
    window.location.reload()
  };

  return (
    <div>
      <Link className="standart_link" href="/" onClick={() => goOut()}>
        Выйти
      </Link>
    </div>
  );
};
