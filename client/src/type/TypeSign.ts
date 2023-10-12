import { UseMutateFunction } from "@tanstack/react-query"
import { IDataErrorSignUp } from "./TypeSignUp"

export interface IProps {
	props: {
		header: string
		sendRequest: UseMutateFunction<any, unknown, void, unknown>,
		dataError: IDataErrorSignUp
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