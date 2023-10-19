import { IInitialState } from "@/store/account/TypeAccount"
import { Dispatch } from "react"
import { RefObject, SetStateAction } from "react"

export const getFirstWidth = (
	findWidth: RefObject<HTMLParagraphElement>,
	reduxUserInfo: IInitialState,
	setLoginChange: Dispatch<SetStateAction<string>>,
	setEmailChange: Dispatch<SetStateAction<string>>,
	setNameChange: Dispatch<SetStateAction<string>>,
	setSurnameChange: Dispatch<SetStateAction<string>>
) => {
	const loading = setInterval(() => {
		if (findWidth.current !== null) {
			clearInterval(loading)

			{
				findWidth.current.innerText = reduxUserInfo.login
				const width = findWidth.current.getBoundingClientRect().width || 0
				const element = document.querySelector(
					"#loginChange"
				) as HTMLInputElement
				element.style.width = width + "px"
				setLoginChange(reduxUserInfo.login)
			}

			{
				findWidth.current.innerText = reduxUserInfo.email
				const width = findWidth.current.getBoundingClientRect().width || 0
				const element = document.querySelector(
					"#emailChange"
				) as HTMLInputElement
				element.style.width = width + "px"
				setEmailChange(reduxUserInfo.email)
			}

			{
				findWidth.current.innerText = reduxUserInfo.name
				const width = findWidth.current.getBoundingClientRect().width || 0
				const element = document.querySelector(
					"#nameChange"
				) as HTMLInputElement
				element.style.width = width + "px"
				setNameChange(reduxUserInfo.name)
			}

			{
				findWidth.current.innerText = reduxUserInfo.surname
				const width = findWidth.current.getBoundingClientRect().width || 0
				const element = document.querySelector(
					"#surnameChange"
				) as HTMLInputElement
				element.style.width = width + "px"
				setSurnameChange(reduxUserInfo.surname)
			}
		}
	}, 10)
}
export const loginFirstWidth = (
	findWidth: RefObject<HTMLParagraphElement>,
	reduxUserInfo: IInitialState,
	setLoginChange: Dispatch<SetStateAction<string>>,
) => {
	const loading = setInterval(() => {
		if (findWidth.current !== null) {
			clearInterval(loading)
			findWidth.current.innerText = reduxUserInfo.login
			const width = findWidth.current.getBoundingClientRect().width || 0
			const element = document.querySelector(
				"#loginChange"
			) as HTMLInputElement
			element.style.width = width + "px"
			setLoginChange(reduxUserInfo.login)
		}
	}, 10)
}
export const emailFirstWidth = (
	findWidth: RefObject<HTMLParagraphElement>,
	reduxUserInfo: IInitialState,
	setEmailChange: Dispatch<SetStateAction<string>>,
) => {
	const loading = setInterval(() => {
		if (findWidth.current !== null) {
			clearInterval(loading)
			findWidth.current.innerText = reduxUserInfo.email
			const width = findWidth.current.getBoundingClientRect().width || 0
			const element = document.querySelector(
				"#emailChange"
			) as HTMLInputElement
			element.style.width = width + "px"
			setEmailChange(reduxUserInfo.email)
		}
	}, 10)
}
export const nameFirstWidth = (
	findWidth: RefObject<HTMLParagraphElement>,
	reduxUserInfo: IInitialState,
	setNameChange: Dispatch<SetStateAction<string>>,
) => {
	const loading = setInterval(() => {
		if (findWidth.current !== null) {
			clearInterval(loading)
			findWidth.current.innerText = reduxUserInfo.name
			const width = findWidth.current.getBoundingClientRect().width || 0
			const element = document.querySelector(
				"#nameChange"
			) as HTMLInputElement
			element.style.width = width + "px"
			setNameChange(reduxUserInfo.name)
		}
	}, 10)
}
export const surnameFirstWidth = (
	findWidth: RefObject<HTMLParagraphElement>,
	reduxUserInfo: IInitialState,
	setSurnameChange: Dispatch<SetStateAction<string>>,
) => {
	const loading = setInterval(() => {
		if (findWidth.current !== null) {
			clearInterval(loading)
			findWidth.current.innerText = reduxUserInfo.surname
			const width = findWidth.current.getBoundingClientRect().width || 0
			const element = document.querySelector(
				"#surnameChange"
			) as HTMLInputElement
			element.style.width = width + "px"
			setSurnameChange(reduxUserInfo.surname)
		}
	}, 10)
}