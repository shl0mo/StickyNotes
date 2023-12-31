"use strict";
const PORT = 5000;
const host = `http://localhost:${PORT}`;
const card_before_update = {
    user: "",
    title: "",
    inclusion_time: "",
    deadline: "",
    text: ""
};
function deleteStickyNote() {
    const card = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    const title = card.children[0].children[0].children[0].children[0].children[0].value;
    const inclusion_time = card.children[0].children[0].children[2].children[0].children[0].value;
    const deadline = card.children[0].children[0].children[2].children[1].children[0].value;
    const text = card.children[0].children[0].children[3].value;
    const data = {
        "title": title,
        "inclusion_time": inclusion_time,
        "deadline": deadline,
        "text": text
    };
    console.log(data);
    fetch(`${host}/excluirLembrete`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        res.json().then((data) => {
            if (data.message === 'sucesso') {
                card.remove();
            }
            else if (data.message == 'erro') {
                alert('Erro ao tentar excluir o lembrete. Tente novamente');
            }
        });
    });
}
function enableEditingStickyNode() {
    const card = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    const input_title = card.children[0].children[0].children[0].children[0].children[0];
    const input_inclusion_time = card.children[0].children[0].children[2].children[0].children[0];
    const input_deadline = card.children[0].children[0].children[2].children[1].children[0];
    const input_text = card.children[0].children[0].children[3];
    const save_button = card.children[0].children[1];
    card_before_update.title = input_title.value;
    card_before_update.inclusion_time = input_inclusion_time.value;
    card_before_update.deadline = input_deadline.value;
    card_before_update.text = input_text.value;
    const inputs = [];
    inputs.push(input_title);
    inputs.push(input_deadline);
    inputs.push(input_text);
    for (const input of inputs) {
        input.readOnly = false;
        input.classList.add('bg-light');
        input.classList.replace('border-0', 'border-1');
        input.classList.add('rounded');
        input.classList.add('p-1');
    }
    save_button.classList.replace('d-none', 'd-block');
}
function saveUpdates() {
    const card = this.parentNode.parentNode;
    const input_title = card.children[0].children[0].children[0].children[0].children[0];
    const input_inclusion_time = card.children[0].children[0].children[2].children[0].children[0];
    const input_deadline = card.children[0].children[0].children[2].children[1].children[0];
    const input_text = card.children[0].children[0].children[3];
    const save_button = card.children[0].children[1];
    const title = input_title.value;
    const inclusion_time = input_inclusion_time.value;
    const deadline = input_deadline.value;
    const text = input_text.value;
    const data = {
        "title_before_update": card_before_update.title,
        "inclusion_time_before_update": card_before_update.inclusion_time,
        "deadline_before_update": card_before_update.deadline,
        "text_before_update": card_before_update.text,
        "title": title,
        "inclusion_time": inclusion_time,
        "deadline": deadline,
        "text": text
    };
    fetch(`${host}/alterarLembrete`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        res.json().then((data) => {
            if (data.message === 'sucesso') {
                const inputs = [];
                inputs.push(input_title);
                inputs.push(input_deadline);
                inputs.push(input_text);
                for (const input of inputs) {
                    input.readOnly = true;
                    input.classList.remove('bg-light');
                    input.classList.replace('border-1', 'border-0');
                    input.classList.remove('rounded');
                    input.classList.remove('p-1');
                }
                save_button.classList.replace('d-block', 'd-none');
            }
            else if (data.message == 'erro') {
                alert('Erro ao tentar alterar o lembrete. Tente novamente');
            }
        });
    });
}
const addCard = (title, inclusion_time, deadline, text) => {
    let card_element_string = `
		<div class="col-md-3 col-sm-6 col-12">

			<div class="card position-relative shadow p-1">
				<div class="card-body">
					<div class="d-flex flex-row justify-content-between m-0">
						<h5 class="card-title mb-3"><input type="text" class="border-0 w-100" value="${title}" readonly></h5>
								<div class="d-flex flex-row w-25 justify-content-around">
								<div>
									<button class="btn p-0 pb-2"><i class="bi bi-pencil-square edit-button"></i></button>
								</div>
								<div class="container-btn-close-card">
									<button type="button" class="btn-close btn-close-card" aria-label="Fechar"></button>
								</div>
							</div>
						</div>
						<hr class="mt-1">
						<h6 class="card-subtitle mb-2 text-primary">
							<div class="mb-1">Data e hora de adição: <input type="datetime-local" class="border-0 w-75" value="${inclusion_time}" readonly></div>
							<div class="text-danger mb-1">Prazo: <input type="datetime-local" class="border-0 w-75" value="${deadline}" readonly></div>
						</h6>
						<textarea rows="2" class="w-100 border-0" style="resize: none;" readonly>${text}</textarea>
					</div>
					<buttom class="save-updates-button btn btn-primary d-none">Salvar</button>
				</div>
			</div>
	`;
    card_element_string = card_element_string.trim();
    const cards_container = document.querySelector('#cards-container');
    cards_container.innerHTML = cards_container.innerHTML + card_element_string;
    const close_buttons = document.querySelectorAll('.container-btn-close-card');
    const edit_buttons = document.querySelectorAll('.edit-button');
    const save_buttons = document.querySelectorAll('.save-updates-button');
    for (let i = 0; i < close_buttons.length; i++) {
        close_buttons[i].addEventListener('click', deleteStickyNote, false);
        edit_buttons[i].addEventListener('click', enableEditingStickyNode, false);
        save_buttons[i].addEventListener('click', saveUpdates, false);
    }
    const close_modal = document.querySelector('#close-modal');
    close_modal === null || close_modal === void 0 ? void 0 : close_modal.click();
};
const createStickyNote = () => {
    let current_datetime = new Date().toISOString();
    current_datetime = current_datetime.split('.')[0];
    const current_datetime_array = current_datetime.split('');
    for (let i = 0; i < 3; i++)
        current_datetime_array.pop();
    current_datetime = current_datetime_array.join('');
    const title = document.querySelector('#input-title').value;
    const inclusion_time = current_datetime;
    const deadline = document.querySelector('#input-deadline').value;
    const text = document.querySelector('#textarea-description').value;
    if (title === '' || inclusion_time === '' || deadline === '') {
        alert('Preencha todos os campos');
        return;
    }
    const data = {
        "title": title,
        "inclusion_time": inclusion_time,
        "deadline": deadline,
        "text": text
    };
    fetch(`${host}/criarLembrete`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        res.json().then((data) => {
            if (data.message === 'sucesso') {
                addCard(title, inclusion_time, deadline, text);
            }
            else if (data.message == 'erro') {
                alert('Erro ao tentar criar o lembrete. Tente novamente');
            }
        });
    });
};
const sendUserData = (action) => {
    const username = document.querySelector('input[name=username]').value;
    const password = document.querySelector('input[name=password]').value;
    if ((username === '') || (password === '')) {
        alert('Preencha todos os campos');
        return;
    }
    const data = {
        "username": username,
        "password": password
    };
    fetch(`${host}/${action}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        res.json().then((data) => {
            if (action === 'logar') {
                if (data.message !== 'Usuário ou senha inválidos') {
                    location.href = document.URL.replace('pages/login', 'index');
                }
                else {
                    alert(data.message);
                }
            }
            else if (action === 'cadastrar') {
                alert(data.message);
            }
        });
    });
};
const logout = () => {
    fetch(`${host}/sair`, {
        method: 'POST'
    }).then((res) => {
        location.href = document.URL.replace('index', 'pages/login');
    });
};
const checkSession = () => {
    fetch(`${host}/checkSession`, {
        method: 'POST'
    }).then((res) => {
        res.json().then((data) => {
            const url = document.URL;
            if (data.user === '') {
                if (url.includes('index'))
                    location.href = document.URL.replace('index', 'pages/login');
            }
            else {
                if (url.includes('login'))
                    location.href = document.URL.replace('pages/login', 'index');
                if (url.includes('cadastro'))
                    location.href = document.URL.replace('pages/cadastro', 'index');
            }
        });
    });
};
const listStickyNotes = () => {
    fetch(`${host}/listStickyNotes`, {
        method: 'POST',
    }).then((res) => {
        res.json().then((data) => {
            const data_array = data.data_array;
            for (let card of data_array) {
                addCard(card.title, card.inclusion_time, card.deadline, card.text);
            }
            const main = document.querySelector('main');
            const container = document.querySelector('.container');
            if (main.offsetHeight < container.offsetHeight)
                main.classList.remove('vh-100');
        });
    });
};
const page_title = document.querySelector('title').innerText;
if (page_title === 'Aplicação') {
    const logout_button = document.querySelector('#logout-button');
    const save_card_button = document.querySelector('#save-card-button');
    logout_button === null || logout_button === void 0 ? void 0 : logout_button.addEventListener('click', logout);
    save_card_button === null || save_card_button === void 0 ? void 0 : save_card_button.addEventListener('click', createStickyNote);
    listStickyNotes();
}
else if (page_title === 'Login') {
    const login_button = document.querySelector('#login-button');
    login_button === null || login_button === void 0 ? void 0 : login_button.addEventListener('click', () => { sendUserData('logar'); });
}
else if (page_title === 'Cadastro') {
    const register_button = document.querySelector('#register-button');
    register_button === null || register_button === void 0 ? void 0 : register_button.addEventListener('click', () => { sendUserData('cadastrar'); });
}
window.addEventListener('load', checkSession);
