export interface IResponseSignUp {
	error: boolean,
	okBody: {
		uniqueName: string
		name: string
		surname: string
		email: string
		password: string
	}
	errorBody: {
		uniqueName: string
		name: string
		surname: string
		email: string
		password: string
	}
}
export interface IDataErrorSignUp {
	uniqueName: string
	name: string
	surname: string
	email: string
	password: string
}