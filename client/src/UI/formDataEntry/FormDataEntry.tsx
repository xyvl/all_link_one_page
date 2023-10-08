import React from "react";
import styles from "./formDataEntry.module.scss";
import { IProps } from "@/type/TypeSignIn";

export const FormDataEntry = ({ props }: IProps) => {
  return (
    <div className="wrapper">
      <div>
        <h1 className={styles.title}>{props.header}</h1>
        <form
          autoComplete="new-password"
          onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => props.sendRequest(e)}
          className={styles.main}
        >
          <input hidden type="text" name="email" autoComplete="username" />
          {props.array.map((el) => (
            <input
              type={el.type}
              autoComplete={el.type === "password" ? "new-password" : "off"}
              value={el.text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                el.mask(e.currentTarget.value)
              }
              className={styles.link}
              placeholder={el.placeholder}
              key={el.placeholder}
            />
          ))}
          <input type="submit" value="Вход" className={styles.submit} />
        </form>
      </div>
    </div>
  );
};
