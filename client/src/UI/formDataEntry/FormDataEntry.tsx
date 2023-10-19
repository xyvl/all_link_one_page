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
					className={styles.main}>
					<input hidden type="text" name="email" autoComplete="username" />
					{props.array.map(el => (
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
				{props.typeSign === "signUp" ? (
					<div key={props.dataError.uniqueName}>
						{props.dataError.uniqueName !== "" ? (
							<p className={styles.error} style={{ textAlign: "center" }}>
								{props.dataError.uniqueName}
							</p>
						) : null}
						{props.dataError.name !== "" ? (
							<p className={styles.error} style={{ textAlign: "center" }}>
								{props.dataError.name}
							</p>
						) : null}
						{props.dataError.surname !== "" ? (
							<p className={styles.error} style={{ textAlign: "center" }}>
								{props.dataError.surname}
							</p>
						) : null}
						{props.dataError.email !== "" ? (
							<p className={styles.error} style={{ textAlign: "center" }}>
								{props.dataError.email}
							</p>
						) : null}
						{props.dataError.password !== "" ? (
							<p className={styles.error} style={{ textAlign: "center" }}>
								{props.dataError.password}
							</p>
						) : null}
					</div>
				) : (
					<div key={props.dataError.loginOrEmail}>
						{props.dataError.loginOrEmail !== "" ? (
							<p className={styles.error} style={{ textAlign: "center" }}>
								{props.dataError.text}
							</p>
						) : null}
					</div>
				)}
			</div>
		</div>
	);
};
