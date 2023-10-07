const PORT : number = 5000
const host : string = `http://localhost:${PORT}`

const sendUserData = (action : string) : void => {
	const _name : string | null = (<HTMLInputElement>document.querySelector('input[name=username]')).value
	const _password : string | null = (<HTMLInputElement>document.querySelector('input[name=password]')).value
	const data : object = {
		"name": _name,
		"password": _password
	}
	fetch(`${host}/${action}`, {
		method: 'POST',
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify(data)
	}).then((res: Response) => {
		res.json().then((data) => {
			alert(data.message)
		})
	})
}


const page_title : string | null  = (<HTMLTitleElement>document.querySelector('title')).innerText
if (page_title === 'Aplicação') {
	const save_card_button : HTMLElement | null = document.querySelector('#save_card_button')
} else if (page_title === 'Login') {
	const login_button : HTMLElement | null = document.querySelector('#login-button')
	login_button?.addEventListener('click', () => { sendUserData('logar') })
} else if (page_title === 'Cadastro') {
	const register_button : HTMLElement | null = document.querySelector('#register-button')
	register_button?.addEventListener('click', () => { sendUserData('cadastrar') })
}
