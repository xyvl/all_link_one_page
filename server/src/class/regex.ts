class RegExpCheckClass{
	private nameAndSurnameRegExp = RegExp(/^([А-Яа-я]{1}[а-яё]{1,70}|[A-Za-z]{1}[a-z]{1,70})$/);
	private loginRegExp = RegExp(/^[a-zA-Z]+$/);
	
	validationNameAndSurname(text: string){
		return this.nameAndSurnameRegExp.test(text)
	}
	validationLogin(text: string){
		return this.loginRegExp.test(text)
	}
}
export const regExpCheck = new RegExpCheckClass()