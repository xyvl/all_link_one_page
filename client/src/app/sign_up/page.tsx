"use client";
import { FormDataEntry } from "@/UI/formDataEntry/FormDataEntry";
import { Header } from "@/components/header/Header";
import { LoadingBlock } from "@/components/loadingBlock/LoadingBlock"
import { regExpCheck } from "@/function/regex";
import { IDataErrorSignUp, IResponseSignUp } from "@/type/TypeSignUp";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";

const page = () => {
  const [dataError, setDataError] = useState<IDataErrorSignUp>({
    uniqueName: '',
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const sendRequest = async () => {
    setLoginError("");
    setNameError("");
    setSurnameError("");
    setEmailError("");
    setPasswordError("");

    const errorBool = {
      login: false,
      name: false,
      surname: false,
      email: false,
      password: false,
    };
    const errorText = {
      login:
        "Вы ввели логин неправильно, можно использовать лишь английские символы.",
      name: "Вы ввели имя неправильно, можно использовать лишь русские и английские символы.",
      surname:
        "Вы ввели фамилию неправильно, можно использовать лишь русские и английские символы.",
      email: "Вы ввели почту не правильно.",
      password: "Вы ввели слишком лёгкий пароль.",
    };

    if (regExpCheck.validationLogin(login) === false) {
      errorBool.login = true;
    }
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

    if (errorBool.login === true) {
      setLoginError(errorText.login);
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
      errorBool.login === false &&
      errorBool.name === false &&
      errorBool.surname === false &&
      errorBool.email === false &&
      errorBool.password === false
    ) {
      const { data }: AxiosResponse<IResponseSignUp> = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_SIGN_UP}`,
        {
          uniqueName: login,
          name,
          surname,
          email,
          password,
        }
      );
      if (data.error === true) {
        setDataError(data.errorBody);
        return;
      }
      localStorage.setItem('login', data.okBody.uniqueName)
      localStorage.setItem('name', data.okBody.name)
      localStorage.setItem('surname', data.okBody.surname)
      localStorage.setItem('email', data.okBody.email)
      localStorage.setItem('password', data.okBody.password)
      window.location.href = '/'
    }
  };
  const maskLogin = (value: string) => {
    setLogin(value);
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
    typeSign: 'signUp',
    sendRequest: signUp.mutate,
    dataError,
    array: [
      {
        placeholder: "Логин",
        type: "text",
        text: login,
        mask: maskLogin,
        textError: loginError,
        setTextError: setLoginError,
      },
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
      {signUp.isLoading === true ? <LoadingBlock/> : <FormDataEntry props={arrayInput} />}
    </>
  );
};

export default page;
