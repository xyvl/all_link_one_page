"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./header.module.scss";
import { StateAccount } from "../stateAccount/StateAccount";
import { Logo } from "@/img/logo/Logo";
import { Theme } from "../theme/Theme";
import { BurgerMenu } from "../burgerMenu/BurgerMenu";

export const Header = () => {
  const [navigation, setNavigation] = useState([
    {
      text: "Аккаунт",
      url: "/account",
    },
    {
      text: "Карточки",
      url: "/card",
    },
  ]);
  return (
    <header>
      <div className="wrapper">
        <div className={styles.main}>
          <div className={styles.inner}>
            <Logo />
            <ul className={styles.inner}>
              {navigation.map((el) => (
                <li key={el.url}>
                  <Link className="standart_link" href={el.url}>
                    {el.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.inner}>
            <Theme />
            <StateAccount />
          </div>
        </div>
        <div className={styles.mobile_main}>
          <Logo />
          <div className={styles.inner}>
            <Theme />
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
