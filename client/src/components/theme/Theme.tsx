"use client";
import React from "react";
import styles from "./theme.module.scss";

export const Theme = () => {
  const changeTheme = () => {
		const theme = document.documentElement.dataset.theme;
    if (theme === 'dark') {
      document.documentElement.dataset.theme = "light";
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.dataset.theme = "dark";
    }
  };

  return (
    <label>
      <input
        onClick={() =>
          changeTheme()
        }
        className={styles.checkbox}
        type="checkbox"
      />
      <span className={styles.circle_checkbox}></span>
    </label>
  );
};