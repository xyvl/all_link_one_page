export interface IDataErrorSignIn {
	text: string
}
export interface IResponseSignIn {
	error: boolean,
	okBody: {
		uniqueName: string
		name: string
		surname: string
		email: string
		password: string
	}
	errorBody: {
		text: string
	}
}