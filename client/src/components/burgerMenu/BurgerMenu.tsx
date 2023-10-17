"use client";
import { useState } from "react";
import styles from "./burgerMenu.module.scss";
import Link from "next/link";
import { StateAccount } from "../stateAccount/StateAccount";

export const BurgerMenu = () => {
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [navigation, setNavigation] = useState([
    { text: "Аккаунт", url: "/account" },
    { text: "Карточки", url: "/card" },
  ]);
  const burgerMenuClick = () => {
    setBurgerMenu((curr) => !curr)
    document.body.classList.toggle('overflow-hidden')
  }
  return (
    <div>
      <div
        className={`${styles.burger_menu} ${
          burgerMenu ? `${styles.active}` : ""
        }`}
        onClick={() => burgerMenuClick()}
      >
        <span
          className={`${styles.burger_menu_line} ${
            burgerMenu ? `${styles.active}` : null
          }`}
        ></span>
      </div>
      <div className={`${styles.main} ${burgerMenu ? `${styles.active}` : ""}`}>
        <div className={styles.menu}>
          {navigation.map((el) => (
            <Link className="standart_link" href={el.url} key={el.url}>
              {el.text}
            </Link>
          ))}
          <StateAccount />
        </div>
      </div>
    </div>
  );
};
