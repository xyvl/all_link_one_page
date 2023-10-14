"use client";
import { FormDataEntry } from "@/UI/formDataEntry/FormDataEntry";
import { Header } from "@/components/header/Header";
import { LoadingBlock } from "@/components/loadingBlock/LoadingBlock";
import { regExpCheck } from "@/function/regex";
import { IDataErrorSignIn, IResponseSignIn } from "@/type/TypeSignIn";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";

const page = () => {
  const [dataError, setDataError] = useState<IDataErrorSignIn>({
    text: ''
  });

  const [loginOrEmail, setLoginorEmail] = useState("");
  const [loginOrEmailError, setLoginOrEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const sendRequest = async (): Promise<void> => {
    setLoginOrEmailError("");
    setPasswordError("");

    const errorBool = {
      loginOrEmail: false,
      password: false,
    };
    const errorText = {
      loginOrEmail: "Логин или почта введены в не вверном формате.",
      password: "Вы ввели слишком лёгкий пароль.",
    };

    // Почта или логин

    if (loginOrEmail.search("@") === -1) {
      if (regExpCheck.validationLogin(loginOrEmail) === false) {
        errorBool.loginOrEmail = true;
      }
    }

    // Пароль

    if (password.length <= 7) {
      errorBool.password = true;
    }

    if (errorBool.password === true) {
      setPasswordError(errorText.password);
    }

    // Отображение ошибки

    if (errorBool.loginOrEmail === true) {
      setLoginOrEmailError(errorText.loginOrEmail);
    }
    if (errorBool.password === true) {
      setPasswordError(errorText.password);
    }

    if (errorBool.password === false && errorBool.loginOrEmail === false) {
      const { data }: AxiosResponse<IResponseSignIn> = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_SIGN_IN}`,
        {
          emailOrLogin: loginOrEmail,
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
  const maskLoginOrEmail = (value: string) => {
    setLoginorEmail(value);
  };
  const maskPassword = (value: string) => {
    setPassword(value);
  };
  const signIn = useMutation({
    mutationFn: sendRequest,
  });

  const arrayInput = {
    header: "Войти",
    typeSign: "signIn",
    sendRequest: signIn.mutate,
    dataError,
    array: [
      {
        placeholder: "Логин или пароль",
        type: "search",
        text: loginOrEmail,
        mask: maskLoginOrEmail,
        textError: loginOrEmailError,
        setTextError: setLoginOrEmailError,
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
      {signIn.isLoading === true ? (
        <LoadingBlock />
      ) : (
        <FormDataEntry props={arrayInput} />
      )}
    </>
  );
};

export default page;
