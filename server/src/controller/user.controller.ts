import { Request, Response } from "express"
import { ICheckEmailRegistered, IResponseSignIn, IResponseSignUp, ISignIn, ISignUp } from "../type/TypeUser"
import { db } from "../db"
import { regExpCheck } from "../class/regex"
import { sha256Password } from "../function/sha256Password"
import { QueryResult } from "pg"

class User {
	async signUp(req: Request<any, any, ISignUp>, res: Response) {
		try {
			let { name, surname, email, password } = req.body

			const response: IResponseSignUp = {
				error: false,
				okBody: {
					name: '',
					surname: '',
					email: '',
					password: ''
				},
				errorBody: {
					name: '',
					surname: '',
					email: '',
					password: ''
				},
			}

			name = name[0].toUpperCase() + name.slice(1)
			surname = surname[0].toUpperCase() + surname.slice(1)

			if (regExpCheck.validationNameAndSurname(name) === false) {
				response.error = true
				response.errorBody.name = 'Неправильно введено имя. Имя должно состоять из русских или английских букв до 71 символа'
			}

			if (regExpCheck.validationNameAndSurname(surname) === false) {
				response.error = true
				response.errorBody.surname = 'Неправильно введена фамилия. Фамилия должна состоять из русских или английских букв до 71 символа'
			}

			const checkEmailRegistered: QueryResult<ICheckEmailRegistered> = await db.query('select * from "user" where email = $1', [email])

			if (email.search('@') === -1) {
				response.error = true
				response.errorBody.email = 'Почта введена не верно'
			}

			if (checkEmailRegistered.rowCount !== 0) {
				response.error = true
				response.errorBody.email = 'Почта уже зарегистрированна'
			}

			if (password.length <= 7) {
				response.error = true
				response.errorBody.password = 'Пароль слишком простой'
			}

			if (response.error === false) {
				await db.query('insert into "user"("name", surname, email, "password") values ($1, $2, $3, $4)', [name, surname, email, sha256Password(password)])
				response.okBody.name = name
				response.okBody.surname = surname
				response.okBody.email = email
				response.okBody.password = password
			}

			res.json(response)
		} catch (e) {
			console.log(e)
			res.json('Непредвиденная ошибка')
		}
	}
	async signIn(req: Request<any, any, ISignIn>, res: Response) {
		try {
			let { email, password } = req.body

			const response: IResponseSignIn = {
				error: false,
				okBody: {
					name: '',
					surname: '',
					email: '',
					password: ''
				},
				errorBody: {
					text: ''
				},
			}

			if (password.length <= 7) {
				response.error = true
				response.errorBody.text = 'Пароль слишком простой'
				password = sha256Password(password)
				res.json(response)
				return
			}

			if (email.search('@') === -1) {
				response.error = true
				response.errorBody.text = 'Почта введена не верно'
				res.json(response)
				return
			}

			const checkEmailRegistered: QueryResult<ICheckEmailRegistered> = await db.query('select * from "user" where email = $1 and password = $2', [email, password])

			if (checkEmailRegistered.rowCount === 0) {
				response.error = true
				response.errorBody.text = 'Почта или пароль не верны'
				res.json(response)
				return
			}

			if (response.error === false) {
				response.okBody.name = checkEmailRegistered.rows[0].name
				response.okBody.surname = checkEmailRegistered.rows[0].surname
				response.okBody.email = checkEmailRegistered.rows[0].email
				response.okBody.password = checkEmailRegistered.rows[0].password
			}

			res.json(response)
		} catch (e) {
			console.log(e)
			res.json('Непредвиденная ошибка')
		}
	}
}

export const userController = new User()