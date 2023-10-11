"use client";
import { FormDataEntry } from "@/UI/formDataEntry/FormDataEntry";
import { Header } from "@/components/header/Header";
import { regExpCheck } from "@/function/regex";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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

  const sendRequest = async () => {
    setNameError("");
    setSurnameError("");
    setEmailError("");
    setPasswordError("");

    const errorBool = {
      name: false,
      surname: false,
      email: false,
      password: false,
    };
    const errorText = {
      name: "Вы ввели имя неправильно, можно использовать лишь русские и английские символы.",
      surname:
        "Вы ввели фамилию неправильно, можно использовать лишь русские и английские символы.",
      email: "Вы ввели почту не правильно.",
      password: "Вы ввели слишком лёгкий пароль.",
    };

    if (regExpCheck.validationNameAndSurname(name) === false) {
      errorBool.name = true;
    }

    if (regExpCheck.validationNameAndSurname(surname) === false) {
      errorBool.surname = true;
    }

    if (email.search("@") === -1) {
      errorBool.email = true;
    }

    if (password.length <= 7) {
      errorBool.password = true;
    }

    if (errorBool.name === true) {
      setNameError(errorText.name);
    }
    if (errorBool.surname === true) {
      setSurnameError(errorText.surname);
    }
    if (errorBool.email === true) {
      setEmailError(errorText.email);
    }
    if (errorBool.password === true) {
      setPasswordError(errorText.password);
    }

    if (
      errorBool.name === false &&
      errorBool.surname === false &&
      errorBool.email === false &&
      errorBool.password === false
    ) {
    }
    const data = await axios.post(`${process.env.NEXT_PUBLIC_URL_TEST}`, {
      name: "Влад",
    });
    console.log(data.data);
    return data.data;
  };
  const maskName = (value: string) => {
    if (value.length !== 0) {
      setName(value[0].toUpperCase() + value.slice(1).toLowerCase());
    } else {
      setName("");
    }
  };
  const maskSurname = (value: string) => {
    if (value.length !== 0) {
      setSurname(value[0].toUpperCase() + value.slice(1).toLowerCase());
    } else {
      setSurname("");
    }
  };
  const maskEmail = (value: string) => {
    setEmail(value);
  };
  const maskPassword = (value: string) => {
    setPassword(value);
  };
  const signUp = useMutation({ mutationFn: sendRequest });
  
  const arrayInput = {
    header: "Зарегистрироваться",
    sendRequest: signUp.mutate ,
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
      {signUp.isLoading === true ? <p color="red">Loading...</p> : null}
    </>
  );
};

export default page;
