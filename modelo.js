'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active')

}



//função para pegar os dados do localStorage e já converter
const getLocalStorage = () => JSON.parse(localStorage.getItem("dbClient")) ?? [];


//funçao para mandar dados para localStorage já convertido em string 
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient));


//CRUD delete

const deleteClient = (index) =>{
    const dbCliente = getLocalStorage()
    dbCliente.splice(index, 1);
    setLocalStorage(dbCliente);
}

//CRUD - update
//função recebe o indice a ser trocado e o nuvo cliente
const updateClient = (index, cliente) => {
    //dbCliente recebe o que tem na base
    const dbCliente = readCliente();
    //com a base eu modifico o cliente no indice indicado
    dbCliente[index] = cliente;
    //chamoa função para mandar de volta
    setLocalStorage(dbCliente);
}

//CRUD - Read
const readCliente = () => getLocalStorage("dbCliente")


//CRUD create
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client);
    setLocalStorage(dbClient)

}

//funcao para verificar se os campos estao todos preenchidos
const isValidFields = () => {
             //metodo que verifica se os campos estão validos
    return document.getElementById("form").reportValidity()
} 

//iterando com o usuario


//
const clearFields = () => {
    const campos = document.querySelectorAll(".modal-field");
    campos.forEach(campo => campo.value = "")

    
}

//funçao para salvar cum novocliente e mandar para o localStorage.
const saveCliente = () => {

    if(isValidFields()){

        const client = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("celular").value,
            cidade: document.getElementById("cidade").value
        }
        //index pega o valor do data atribute data-index="new" no caso valor "new"
        const index = document.getElementById('nome').dataset.index
        //se index tem o valor de new cria um novo cliente
        if(index == "new"){

            createClient(client);
            closeModal();
            updateTable()
        }else{
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

//criando os dados na tela
//aqui o forEach por padrão manda o indice sempre, mesmo que não seje passado na chamada da função.
const createRow = (client, index) => {
    //criando uma tr e colocando dentro dela o html formatado.
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `//selecionado o local que vai ser inserido o banco de dados formatado para html
    document.querySelector("#tableClient>tbody").appendChild(newRow)
}

//função para apagar as linhas que já estavam lá
const clearTable = () => {
    const rows = document.querySelectorAll("#tableClient>tbody tr");
    rows.forEach(row => row.parentNode.removeChild(row));
        
}


//função para iterar sobre os dados.
const updateTable = () => {
    //leia as linhas clientes e devolve um array
    const dbClient = readCliente();
    clearTable()
    //para cada indice da array chama a função para criar linhas
    dbClient.forEach(createRow)
}

//função para preencher os campos do navedador
const fillFields = (client) => {
    document.getElementById("nome").value = client.nome
    document.getElementById("email").value = client.email
    document.getElementById("celular").value = client.celular
    document.getElementById("cidade").value = client.cidade
    //informando que o modal foi aberto para editar um cliente e não add um novo.
    document.getElementById("nome").dataset.index = client.index

    console.log(client.index)

}

const editClient = (index) => {
    //o readCliente é um array entao estou pegando o array com todos os clientes e estou acessando somente o cerrespondente ao índice
    const client = readCliente()[index]
    //anexando o indice para chamar na nova função.
    client.index = index
    //chama a função para preencher os campos
    fillFields(client)
    //abra a tela de preenchimento
    openModal()
}


const editDelete = (event) => {
    //se no click o alvo for do type button
    if(event.target.type == "button"){
        //pegar o id do evento e separar o texto em 2 (onde tever - vira a virgula d array, como são 2 elementos no array se usar a desestruturação ele fica um elemento em cada variável)e colocar em 2 variáveis
        const [action, index] = event.target.id.split("-")
        //se o botao clicado tem a actiom edit , se NÃO FOR É O DELETAR.
        if(action == "edit"){
            editClient(index)
        }else{
            //cliente vai ler todos os clientes mas vai salvar apenas o cliente com o indice do botão
            const client = readCliente()[index]

            const response = confirm(`deseja Realmente excluir o ${client.nome}`)

            if(response){
    
                //CHAMA A FUNÇÃO DE DELETAR
                deleteClient(index)
                //atualiza a tela
                updateTable()

            }

        }
        
    }
}


updateTable()


    //eventos

document.getElementById("cancelar").addEventListener("click", closeModal)

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById("salvar").addEventListener("click", saveCliente);

document.querySelector("#tableClient>tbody").addEventListener("click", editDelete);