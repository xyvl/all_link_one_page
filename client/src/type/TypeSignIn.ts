export interface IProps {
	props: {
		header: string
		sendRequest: (e: React.ChangeEvent<HTMLFormElement>) => void
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