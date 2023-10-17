import { Request, Response } from "express"
import { ICheckEmailRegistered, IResponseSignIn, IResponseSignUp, ISignIn, ISignUp } from "../type/TypeUser"
import { db } from "../db"
import { regExpCheck } from "../class/regex"
import { sha256Password } from "../function/sha256Password"
import { QueryResult } from "pg"

class User {
	async signUp(req: Request<any, any, ISignUp>, res: Response) {
		try {
			let { uniqueName: uniqueName, name, surname, email, password } = req.body

			const response: IResponseSignUp = {
				error: false,
				okBody: {
					uniqueName: '',
					name: '',
					surname: '',
					email: '',
					password: ''
				},
				errorBody: {
					uniqueName: '',
					name: '',
					surname: '',
					email: '',
					password: ''
				},
			}

			name = name[0].toUpperCase() + name.slice(1)
			surname = surname[0].toUpperCase() + surname.slice(1)

			// Логин

			if (regExpCheck.validationLogin(uniqueName) === false) {
				response.error = true
				response.errorBody.uniqueName = 'Логин введен не вверном формате.'
			}

			const checkUniqueName: QueryResult<ICheckEmailRegistered> = await db.query('select * from "user" where unique_name = $1', [uniqueName])

			if (checkUniqueName.rowCount !== 0) {
				response.error = true
				response.errorBody.uniqueName = 'Логин уже занят.'
			}

			// Имя

			if (regExpCheck.validationNameAndSurname(name) === false) {
				response.error = true
				response.errorBody.name = 'Неправильно введено имя. Имя должно состоять из русских или английских букв до 71 символа.'
			}

			// Фамилия

			if (regExpCheck.validationNameAndSurname(surname) === false) {
				response.error = true
				response.errorBody.surname = 'Неправильно введена фамилия. Фамилия должна состоять из русских или английских букв до 71 символа.'
			}

			// Email

			const checkEmailRegistered: QueryResult<ICheckEmailRegistered> = await db.query('select * from "user" where email = $1', [email])

			if (email.search('@') === -1) {
				response.error = true
				response.errorBody.email = 'Почта введена не верно.'
			}

			if (checkEmailRegistered.rowCount !== 0) {
				response.error = true
				response.errorBody.email = 'Почта уже зарегистрированна.'
			}

			// Пароль

			if (password.length <= 7) {
				response.error = true
				response.errorBody.password = 'Пароль слишком простой.'
			}

			// Проверить на то что все валидации пройдены

			if (response.error === false) {
				await db.query('insert into "user"(unique_name, "name", surname, email, "password") values ($1, $2, $3, $4, $5)', [uniqueName, name, surname, email, sha256Password(password)])
				response.okBody.uniqueName = uniqueName
				response.okBody.name = name
				response.okBody.surname = surname
				response.okBody.email = email
				response.okBody.password = password
			}

			res.json(response)
		} catch (e) {
			console.log(e)
			res.json({
				error: true,
				okBody: {
					uniqueName: '',
					name: '',
					surname: '',
					email: '',
					password: ''
				},
				errorBody: {
					uniqueName: 'Непредвиденная ошибка',
					name: '',
					surname: '',
					email: '',
					password: ''
				},
			})
		}
	}
	async signIn(req: Request<any, any, ISignIn>, res: Response) {
		try {
			let { emailOrLogin, password } = req.body
			const response: IResponseSignIn = {
				error: false,
				okBody: {
					uniqueName: '',
					name: '',
					surname: '',
					email: '',
					password: ''
				},
				errorBody: {
					text: ''
				},
			}

			// Пароль

			if (password.length <= 7) {
				response.error = true
				response.errorBody.text = 'Пароль слишком простой'
				res.json(response)
				return
			}

			// Валидация почты или логина

			let checkEmailRegistered: QueryResult<ICheckEmailRegistered>

			// Валидация логина

			if (emailOrLogin.search('@') === -1) {
				if (regExpCheck.validationLogin(emailOrLogin) === false) {
					response.error = true
					response.errorBody.text = 'Логин или почта введены в не вверном формате.'
					res.json(response)
					return
				}
				checkEmailRegistered = await db.query('select * from "user" where unique_name = $1 and password = $2',
					[emailOrLogin, sha256Password(password)])
			}
			else {
				checkEmailRegistered = await db.query('select * from "user" where email = $1 and password = $2',
					[emailOrLogin, sha256Password(password)])
			}


			if (checkEmailRegistered.rowCount === 0) {
				response.error = true
				response.errorBody.text = 'Введены не верные данные'
				res.json(response)
				return
			}

			if (response.error === false) {
				response.okBody.uniqueName = checkEmailRegistered.rows[0].unique_name
				response.okBody.name = checkEmailRegistered.rows[0].name
				response.okBody.surname = checkEmailRegistered.rows[0].surname
				response.okBody.email = checkEmailRegistered.rows[0].email
				response.okBody.password = password
			}

			res.json(response)
		} catch (e) {
			console.log(e)
			res.json({
				error: true,
				okBody: {
					uniqueName: '',
					name: '',
					surname: '',
					email: '',
					password: ''
				},
				errorBody: {
					text: 'Непредвиденная ошибка'
				},
			}
			)
		}
	}
}

export const userController = new User()