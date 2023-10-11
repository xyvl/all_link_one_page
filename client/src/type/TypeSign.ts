import { UseMutateFunction } from "@tanstack/react-query"

export interface IProps {
	props: {
		header: string
		sendRequest: UseMutateFunction<any, unknown, void, unknown>
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