"use client";
import axios, { AxiosResponse } from "axios";
import styles from "./userInfoBlock.module.scss";
import { useQuery } from "@tanstack/react-query";
import { IResponseSignIn } from "@/type/TypeSignIn";
import { useCustomDispatch, useCustomSelector } from "@/hooks/redux";
import { clearUserData, writeData } from "@/store/account/accountSlice";
import { useEffect, useRef, useState } from "react";
import { PushMenuChangePassword } from "./pushMenu/PushMenuChangePassword";
import { SvgReturn } from "./svgReturn/SvgReturn";
import {
	emailFirstWidth,
	loginFirstWidth,
	nameFirstWidth,
	surnameFirstWidth
} from "./function/getFirstWidth";

export const UserInfoBlock = () => {
	const dispatch = useCustomDispatch();
	const reduxUserInfo = useCustomSelector(state => state.accountRoot);
	const findWidth = useRef<HTMLParagraphElement>(null);

	const [changePasswordMenu, setChangePasswordMenu] = useState<boolean>(false);

	const [loginChange, setLoginChange] = useState<string>("");
	const [emailChange, setEmailChange] = useState<string>("");
	const [nameChange, setNameChange] = useState<string>("");
	const [surnameChange, setSurnameChange] = useState<string>("");

	if (
		reduxUserInfo.password === "" ||
		reduxUserInfo.email === "" ||
		reduxUserInfo.login === ""
	) {
		return (
			<div className="wrapper">
				<h1 className={styles.no_auhtorization}>Вы не вошли</h1>
			</div>
		);
	}

	const getUserInfo = async () => {
		const { data }: AxiosResponse<IResponseSignIn> = await axios.post(
			`${process.env.NEXT_PUBLIC_URL_SIGN_IN}`,
			{
				emailOrLogin: reduxUserInfo.login,
				password: reduxUserInfo.password
			}
		);
		if (data.error === false) {
			dispatch(
				writeData({
					login: data.okBody.uniqueName,
					name: data.okBody.name,
					surname: data.okBody.surname,
					email: data.okBody.email,
					password: data.okBody.password
				})
			);
		} else {
			localStorage.setItem("login", "");
			localStorage.setItem("name", "");
			localStorage.setItem("surname", "");
			localStorage.setItem("email", "");
			localStorage.setItem("password", "");
			dispatch(clearUserData());
			window.location.reload();
		}
		return data;
	};

	const data = useQuery({ queryKey: ["userGetInfo"], queryFn: getUserInfo });

	const width = (
		e: React.ChangeEvent<HTMLInputElement>,
		text: "login" | "email" | "name" | "surname"
	) => {
		if (findWidth.current !== null) {
			if (text === "login") {
				findWidth.current.innerText = e.currentTarget.value;
				const width = findWidth.current.getBoundingClientRect().width || 0;
				const element = document.querySelector(
					"#loginChange"
				) as HTMLInputElement;
				element.style.width = width + "px";
				setLoginChange(e.currentTarget.value);
			}
			if (text === "email") {
				findWidth.current.innerText = e.currentTarget.value;
				const width = findWidth.current.getBoundingClientRect().width || 0;
				const element = document.querySelector(
					"#emailChange"
				) as HTMLInputElement;
				element.style.width = width + "px";
				setEmailChange(e.currentTarget.value);
			}
			if (text === "name") {
				findWidth.current.innerText = e.currentTarget.value;
				const width = findWidth.current.getBoundingClientRect().width || 0;
				const element = document.querySelector(
					"#nameChange"
				) as HTMLInputElement;
				element.style.width = width + "px";
				setNameChange(e.currentTarget.value);
			}
			if (text === "surname") {
				findWidth.current.innerText = e.currentTarget.value;
				const width = findWidth.current.getBoundingClientRect().width || 0;
				const element = document.querySelector(
					"#surnameChange"
				) as HTMLInputElement;
				element.style.width = width + "px";
				setSurnameChange(e.currentTarget.value);
			}
		}
	};

	useEffect(() => {
		loginFirstWidth(findWidth, reduxUserInfo, setLoginChange);
		emailFirstWidth(findWidth, reduxUserInfo, setEmailChange);
		nameFirstWidth(findWidth, reduxUserInfo, setNameChange);
		surnameFirstWidth(findWidth, reduxUserInfo, setSurnameChange);
	}, []);

	const changeUserData = async (
		type: "login" | "email" | "name" | "surname"
	) => {
		if (type === "login") {
			loginFirstWidth(findWidth, reduxUserInfo, setLoginChange);
		}
		if (type === "email") {
			emailFirstWidth(findWidth, reduxUserInfo, setEmailChange);
		}
		if (type === "name") {
			nameFirstWidth(findWidth, reduxUserInfo, setNameChange);
		}
		if (type === "surname") {
			surnameFirstWidth(findWidth, reduxUserInfo, setSurnameChange);
		}
	};

	if (data.data?.error === false) {
		return (
			<div className="wrapper">
				<h1 className={styles.header}>Ваши данные:</h1>
				<span
					ref={findWidth}
					id="widthChange"
					className={styles.width_check}></span>
				<div className={styles.grid}>
					<div className={styles.table_name}>
						<span className={styles.info_block}>Логин:</span>
						<span className={styles.info_block}>Почта:</span>
						<span className={styles.info_block}>Имя: </span>
						<span className={styles.info_block}>Фамилия:</span>
					</div>
					<div className={styles.table_value}>
						<div className={styles.block_data}>
							<input
								id="loginChange"
								className={styles.input}
								onChange={e => width(e, "login")}
								type="text"
								value={loginChange}
							/>
							<SvgReturn text="login" func={changeUserData} />
						</div>
						<div className={styles.block_data}>
							<input
								id="emailChange"
								className={styles.input}
								onChange={e => width(e, "email")}
								type="text"
								value={emailChange}
							/>
							<SvgReturn text="email" func={changeUserData} />
						</div>
						<div className={styles.block_data}>
							<input
								id="nameChange"
								className={styles.input}
								onChange={e => width(e, "name")}
								type="text"
								value={nameChange}
							/>
							<SvgReturn text="name" func={changeUserData} />
						</div>
						<div className={styles.block_data}>
							<input
								id="surnameChange"
								className={styles.input}
								onChange={e => width(e, "surname")}
								type="text"
								value={surnameChange}
							/>
							<SvgReturn text="surname" func={changeUserData} />
						</div>
					</div>
				</div>
				<button
					className={styles.change_password}
					onClick={() => setChangePasswordMenu(currValue => !currValue)}>
					Изменить пароль
				</button>
				{changePasswordMenu === true ? <PushMenuChangePassword /> : null}
			</div>
		);
	}

	return (
		<div className="wrapper">
			<h1 className={styles.header}>Вы не вошли</h1>
		</div>
	);
};
