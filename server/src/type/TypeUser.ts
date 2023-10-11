export interface ISignIn {
	email: string,
	password: string
}
export interface ISignUp {
	name: string,
	surname: string,
	email: string,
	password: string
}
export interface IResponseSignUp {
	error: boolean,
	okBody: {
		name: string
		surname: string
		email: string
		password: string
	}
	errorBody: {
		name: string
		surname: string
		email: string
		password: string
	}
}
export interface IResponseSignIn {
	error: boolean,
	okBody: {
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
	name: string,
	surname: string,
	email: string,
	password: string
}