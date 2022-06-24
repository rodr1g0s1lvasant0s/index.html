async function adicionar(vinhos, vinho) { 
    let r = await fetch('vinhos/cadastrar') 
    return r.json()
}
function alterar(vinhos, vinho, id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            vinhos[id] = vinho
            resolve({ok: true})
        }, 1000);
    })
}
function deletar(vinhos, id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            vinhos.splice(id, 1)
            resolve({ok: true})
        }, 1000);
    })
}
async function listar(vinhos) {
    let r = await fetch('vinhos/listar') 
    return r.json()
}

function mostrar_cadastro() {
    let nome = document.querySelector('#nome').value;
    let autor = document.querySelector('#autor').value;
    let ano = document.querySelector('#ano').value;
    let vinho = {
        nome: nome,
        autor: autor,
        ano: ano 
    };
    return vinho
}


function mostrar_lista(vinhos) {
    let mensagem = '';
    let id = 0;
    let tbody = document.querySelector('#tbody');
    tbody.innerHTML = '';
    for (let vinho of vinhos) {
        let idade = calcularIdade(vinho.ano )
        let linha = document.createElement('tr')
        let coluna = document.createElement('td')
        let coluna2 = document.createElement('td')
        let coluna3 = document.createElement('td')
        let coluna4 = document.createElement('td')
        let coluna5 = document.createElement('td')
        let botao = document.createElement('button')
        coluna.innerText = id
        coluna2.innerText = vinho.nome
        coluna3.innerText = vinho.autor
        coluna4.innerText = vinho.ano
        coluna5.innerHTML = `<button onclick="deletar(vinhosvinhos_, ${id})">apagar</button>`
        botao.innerText = 'editar';
        botao.onclick = function (id) {
            return function () {
                controlar_edicao(vinhosvinhos_, id)
            }
        } (id);
        linha.appendChild(coluna)
        linha.appendChild(coluna2)
        linha.appendChild(coluna3)
        linha.appendChild(coluna4)
        linha.appendChild(coluna5)
        coluna5.appendChild(botao)
        tbody.appendChild(linha)
        id++ ;
    }
}

function mostrar_resultado(resultado) {
    let mensagem = document.querySelector('#mensagem');
    mensagem.innerHTML = resultado.ok;
    if (resultado.ok) {
        mensagem.classList.add('certa') 
        mensagem.classList.remove('errado') 
    }
    else {
        mensagem.classList.add('errado')
        mensagem.classList.remove('certa') 
    }
}


let vinhosTerror = [];
let vinhosvinhos_ = [];
function adicionar(vinhos, vinho) { 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            vinhos.push(vinho);
            resolve({ok: true})
        }, 1000);
    })
}
function alterar(vinhos, vinho, id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            vinhos[id] = vinho
            resolve({ok: true})
        }, 1000);
    })
}
function deletar(vinhos, id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            vinhos.splice(id, 1)
            resolve({ok: true})
        }, 1000);
    })
}
function listar(vinhos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(vinhos)
        }, 1000);
    })
}
function calcularIdade(ano) {
    let idade = new Date().getFullYear() - ano;
    return idade;
}
async function controlar_lista(vinhos) {
    let lista = await listar(vinhos)
    mostrar_lista(lista)
}
async function cadastrar(vinhos) {
    let vinho = mostrar_cadastro()
    let resultado = await adicionar(vinhos, vinho)
    mostrar_resultado(resultado)
}
function editar(vinhos) {
    controlar_lista(vinhos)
    let id = parseInt(prompt('Qual id quer editar?'))
    controlar_edicao(vinhos, id)
}
function controlar_edicao(vinhos, id) { 
    let vinho = vinhos[id]
    let vinhoNovo = mostrar_edicao(vinho)
    alterar(vinhos, vinhoNovo, id)
    
}  
function apagar(vinhos) {
    controlar_lista(vinhos)
    let id = mostrar_delete() 
    deletar(vinhos, id)
    
}

function mostrar_cadastro() {
    alert('cadastrar') 
    let nome = prompt('nome do vinho');
    let autor = prompt('nome do autor');
    let ano = parseInt(prompt('ano de publicacao do vinho '));
    let vinho = {
        nome: nome,
        autor: autor,
        ano: ano 
    };
    return vinho
}
function mostrar_edicao(vinho) {
    let nome = prompt(`nome do vinho? [${vinho.nome}]`); 
    if (nome == '') {
        nome = vinho.nome        
    } 
    let autor = prompt(`nome do autor? [${vinho.autor}]`);
    if (autor == '') {
        autor = vinho.autor        
    } 
    let ano = prompt(`ano  do vinho? [${vinho.ano}]`);
    if (ano == '') {
        ano = vinho.ano        
    }
    let vinhoNovo = {
        nome: nome,
        autor: autor,
        ano: ano
    };
    return vinhoNovo
    
}
function mostrar_delete() {
    let id = parseInt(prompt('Qual id quer apagar?'))
    return id 
}

function mostrar_lista(vinhos) {
    alert('listar')
    let mensagem = '';
    let id = 0;
    for (let vinho of vinhos) {
        let idade = calcularIdade(vinho.ano )
        mensagem += id + ':' + vinho['nome'] + '-' + vinho.autor + ':' + vinho.ano + 'publicado há ' + idade + '\n';
        id++ ;
    }
    alert(mensagem);
}
function mostrar_resultado(resultado) {
    alert(resultado);
}
function menu() {
    loop:
        while (true) {
            alert('1:cadastrarvinhos\n2:lista\n3:editar\n4:apagar\n5:sair');
            opcao = prompt('');
            switch (opcao) {
                case '1': 
                    cadastrar(vinhosvinhos_)
                    break
                case '2': 
                    controlar_lista(vinhosvinhos_)

                    break
                case '3':
                    editar(vinhosvinhos_)
                    break
                case '4':
                    apagar(vinhosvinhos_)
                    break
                case '5': 
                    alert('sair')
                    break loop;
            }
        }
}
