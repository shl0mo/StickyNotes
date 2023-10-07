const PORT : number = 5000
const host : string = `http://localhost:${PORT}`


type Card = {
	"user" : string
	"title" : string
	"inclusion_time" : string
	"deadline" : string
	"text" : string
}


const formatDateTime = (unformatted_date : string) : string => {
	let date : string = unformatted_date.split('T')[0]
	while (date.includes('-')) date = date.replace('-', '/')
	const time : string = unformatted_date.split('T')[1].split('.')[0]
	return `${date} &bullet; ${time}`
}

const addCard = (title : string, inclusion_time : string, deadline : string, text : string) : void => {	
	let card_element_string : string = `
		<div class="col-md-3 col-sm-6 col-12">
			<div class="card position-relative shadow p-1">
				<div class="card-body">
					<div class="d-flex flex-row justify-content-between m-0">
						<h5 class="card-title mb-3">${title}</h5>
							<span>
								<button type="button" class="btn-close" aria-label="Fechar"></button>
							</span>
						</div>
						<hr class="mt-1">
						<h6 class="card-subtitle mb-2 text-primary">
							<div class="mb-1">Data e hora de adição: ${inclusion_time}</div>
							<div class="text-danger mb-1">Prazo: ${deadline}</div>
						</h6>
						<p class="card-text">
						${text}
						</p>
					</div>
				</div>
			</div>
	`
	card_element_string = card_element_string.trim()
	const cards_container : HTMLElement = (<HTMLElement>document.querySelector('#cards-container'))
	cards_container.innerHTML = cards_container.innerHTML + card_element_string
	const close_modal : HTMLElement | null = document.querySelector('#close-modal')
	close_modal?.click()
}

const createStickyNote = () : void => {
	const current_datetime = new Date().toISOString()
	const title : string | null = (<HTMLInputElement>document.querySelector('#input-title')).value
	const inclusion_time : string | null = formatDateTime(current_datetime)
	const deadline : string | null = formatDateTime((<HTMLInputElement>document.querySelector('#input-deadline')).value)
	const text : string | null = (<HTMLInputElement>document.querySelector('#textarea-description')).value
	if (title === '' || inclusion_time === '' || deadline === '' || text === '') {
		alert('Preencha todos os campos')
		return
	}
	const data : object = {
		"title": title,
		"inclusion_time": inclusion_time,
		"deadline": deadline,
		"text": text
	}
	fetch(`${host}/criarLembrete`, {
		method: 'POST',
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify(data)
	}).then((res: Response) => {
		res.json().then((data) => {
			if (data.message === 'sucesso') {
				addCard(title, inclusion_time, deadline, text)
			} else if (data.message == 'erro') {
				alert('Erro ao tentar criar o lembrete. Tente novamente')
			}
		})
	})
}

const sendUserData = (action : string) : void => {
	const username : string | null = (<HTMLInputElement>document.querySelector('input[name=username]')).value
	const password : string | null = (<HTMLInputElement>document.querySelector('input[name=password]')).value
	if ((username === '') || (password === '')) {
		alert('Preencha todos os campos')
		return
	}
	const data : object = {
		"username": username,
		"password": password
	}
	fetch(`${host}/${action}`, {
		method: 'POST',
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify(data)
	}).then((res: Response) => {
		res.json().then((data) => {
			if (action === 'logar') {
				if (data.message !== 'Usuário ou senha inválidos') {
					location.href = document.URL.replace('pages/login', 'index')
				} else {
					alert(data.message)
				}
			} else if (action === 'cadastrar') {
				alert(data.message)
			}
		})
	})
}

const logout = () : void => {
	fetch(`${host}/sair`, {
		method: 'POST'
	}).then((res: Response) => {
		location.href = document.URL.replace('index', 'pages/login')
	})
}

const checkSession = () : void => {
	fetch(`${host}/checkSession`, {
		method: 'POST'
	}).then((res: Response) => {
		res.json().then((data) => {
			const url = document.URL
			if (data.user === '') {
				if (url.includes('index')) location.href = document.URL.replace('index', 'pages/login')
			} else {
				if (url.includes('login')) location.href = document.URL.replace('pages/login', 'index')
				if (url.includes('cadastro')) location.href = document.URL.replace('pages/cadastro', 'index')
			}
		})
	})
}

const listStickyNotes = () : void => {
	fetch(`${host}/listStickyNotes`, {
		method: 'POST',
	}).then((res: Response) => {
		res.json().then((data) => {
			console.log(data)
			const data_array = data.data_array
			for (let card of data_array) {
				addCard(
					card.title,
					card.inclusion_time,
					card.deadline,
					card.text
				)
			}
		})
	})
}


const page_title : string | null  = (<HTMLTitleElement>document.querySelector('title')).innerText
if (page_title === 'Aplicação') {
	const logout_button : HTMLElement | null = document.querySelector('#logout-button') 
	const save_card_button : HTMLElement | null = document.querySelector('#save-card-button')
	logout_button?.addEventListener('click', logout)
	save_card_button?.addEventListener('click', createStickyNote)
	listStickyNotes()
} else if (page_title === 'Login') {
	const login_button : HTMLElement | null = document.querySelector('#login-button')
	login_button?.addEventListener('click', () => { sendUserData('logar') })
} else if (page_title === 'Cadastro') {
	const register_button : HTMLElement | null = document.querySelector('#register-button')
	register_button?.addEventListener('click', () => { sendUserData('cadastrar') })
}
window.addEventListener('load', checkSession)
