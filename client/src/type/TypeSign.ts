import { UseMutateFunction } from "@tanstack/react-query"
import { IDataErrorSignUp } from "./TypeSignUp"
import { IDataErrorSignIn } from "./TypeSignIn"

export interface IProps {
	props: {
		header: string
		typeSign: string
		sendRequest: UseMutateFunction<void, unknown, void, unknown>,
		dataError: any
		array: {
			placeholder: string
			type: string
			text: string
			mask: (value: string) => void
			textError: string
			setTextError: React.Dispatch<React.SetStateAction<string>>
		}[]
	}
}