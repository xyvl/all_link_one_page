import { sha256 } from "js-sha256"

export const sha256Password = (text: string) => {
	return sha256(text + process.env.SECRET_TEXT)
}