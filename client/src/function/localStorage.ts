const clearUserDataLocalStorage = () => {
	localStorage.setItem('login', "")
	localStorage.setItem('name', "")
	localStorage.setItem('surname', "")
	localStorage.setItem('email', "")
	localStorage.setItem('password', "")
}