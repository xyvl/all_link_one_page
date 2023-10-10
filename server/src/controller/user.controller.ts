import { Request, Response } from "express"
import { ISignIn, ISignUp } from "../type/TypeUser"
import { db } from "../db"
class User {
	async signUp(req: Request<any, any, ISignUp>, res: Response) {
		try {
			const {name, surname, email, password} = req.body;
			
			// const data = await db.query('insert into "user"("name", surname, email, "password") values ($1, $2, $3, $4)', [name, surname, email, password])
			// const data = await db.query('select * from "user"; select * from "user";')
			// res.json(data)
			res.json('finish')
			
		} catch (e) {
			console.log(e)
			res.json(e)
		}
		// res.json(`Имя: ${name}, Фамилия: ${surname}, Почта: ${email}, Пароль: ${password}`)
	}
	async signIn(req: Request<any, any, ISignIn>, res: Response) {
		const {email, password} = req.body
		res.json(`Почта: ${email}, Пароль: ${password}`)
	}
}

export const userController = new User()