import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from "./routes/user.routes"
dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post('/test', (req, res) => {
  res.json('hi')
})

app.use('/user', userRouter)

app.listen(PORT, () => {
	try {
		console.log(`сервер работает на порту: ${PORT}`)
	} catch (e) {
		console.log(e)
	}
})