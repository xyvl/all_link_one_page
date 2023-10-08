"use client";
import { FormDataEntry } from "@/UI/formDataEntry/FormDataEntry";
import { Header } from "@/components/header/Header";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const sendRequest = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const maskName = (value: string) => {
    if (value.length !== 0) {
      setName(value[0].toUpperCase() + value.slice(1));
    } else {
      setName("");
    }
  };
  const maskSurname = (value: string) => {
    if (value.length !== 0) {
      setSurname(value[0].toUpperCase() + value.slice(1));
    } else {
      setSurname("");
    }
  };
  const maskEmail = (value: string) => {
    console.log(value);
    setEmail(value);
  };
  const maskPassword = (value: string) => {
    console.log(value);
    setPassword(value);
  };
  const arrayInput = {
    header: "Вход",
    sendRequest,
    array: [
      {
        placeholder: "Имя",
        type: "search",
        text: name,
        mask: maskName,
        textError: nameError,
        setTextError: setNameError,
      },
      {
        placeholder: "Фамилия",
        type: "search",
        text: surname,
        mask: maskSurname,
        textError: surnameError,
        setTextError: setSurnameError,
      },
      {
        placeholder: "Почта",
        type: "search",
        text: email,
        mask: maskEmail,
        textError: emailError,
        setTextError: setEmailError,
      },
      {
        placeholder: "Пароль",
        type: "password",
        text: password,
        mask: maskPassword,
        textError: passwordError,
        setTextError: setPasswordError,
      },
    ],
  };
  return (
    <>
      <Header />
      <FormDataEntry props={arrayInput} />
    </>
  );
};

export default page;
