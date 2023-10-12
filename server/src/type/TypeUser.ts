export interface ISignIn {
	emailOrLogin: string,
	password: string
}
export interface ISignUp {
	uniqueName: string
	name: string,
	surname: string,
	email: string,
	password: string
}
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
export interface ICheckEmailRegistered {
	id: number,
	unique_name: string
	name: string,
	surname: string,
	email: string,
	password: string
}