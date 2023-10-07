import React from "react";
import logo from "./img/logo.png";
import Link from "next/link";
import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <div className={styles.main}>
          <div className={styles.inner}>
            <Link className={styles.link} href="/">
              <img width="60" height="60" src={logo.src} alt="" />
            </Link>
            <ul className={styles.inner}>
              <li>
                <Link className={styles.link} href="/account">
                  Аккаунт
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/account">
                  Карточки
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link className={styles.link} href="/sign_in">
              Войти
            </Link>
            <span className={styles.text_size}> / </span>
            <Link className={styles.link} href="/sign_up">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
