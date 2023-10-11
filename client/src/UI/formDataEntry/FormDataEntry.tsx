import React from "react";
import styles from "./formDataEntry.module.scss";
import { IProps } from "@/type/TypeSign";

export const FormDataEntry = ({ props }: IProps) => {
  return (
    <div className="wrapper">
      <div>
        <h1 className={styles.title}>{props.header}</h1>
        <form
          autoComplete="new-password"
          onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
            e.preventDefault();
            props.sendRequest();
          }}
          className={styles.main}
        >
          <input hidden type="text" name="email" autoComplete="username" />
          {props.array.map((el) => (
            <div key={el.placeholder} className={styles.block_input}>
              <input
                type={el.type}
                autoComplete={el.type === "password" ? "new-password" : "off"}
                value={el.text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  el.mask(e.currentTarget.value)
                }
                className={styles.link}
                placeholder={el.placeholder}
              />
              {el.textError.length ? (
                <p className={styles.error}>{el.textError}</p>
              ) : null}
            </div>
          ))}
          <input type="submit" value={props.header} className={styles.submit} />
        </form>
      </div>
    </div>
  );
};
