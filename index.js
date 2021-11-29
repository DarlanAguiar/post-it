
var indiceGlobal;

function buscarDadosDoLocalStorage () {
    return JSON.parse(localStorage.getItem("dadosPostit")) ?? [];
}

function inserirNoLocalStorage (dados) {

    localStorage.setItem("dadosPostit", JSON.stringify(dados));
    
}

function editarDadosNoBancoDados(indice, novaAnotacao){
    let bancoDeDados = buscarDadosDoLocalStorage();
    bancoDeDados[indice] = novaAnotacao;
    inserirNoLocalStorage(bancoDeDados);
    location.reload()
    //atualizaLembretes();
}

function deletarDadosBancoDados(indice){
    let bancoDeDados = buscarDadosDoLocalStorage();
    bancoDeDados.splice(indice, 1);
    inserirNoLocalStorage(bancoDeDados);
    location.reload()
    //atualizaLembretes();

}

function salvarDados () {
    //pegando o texto digitado
    var campoInformacoes = document.querySelector("[data-mensagem]");
    var informacoes = campoInformacoes.value;
    
    let bancoDeDados = buscarDadosDoLocalStorage()

    bancoDeDados.push(informacoes)

    inserirNoLocalStorage(bancoDeDados);
    location.reload()
    
}

function mostrarCardNaTela(conteudo, indice){

    let local = document.querySelector(".container-cards");

    let lembreteMontado = `
    <div class="post-it">
        <p class="texto">${conteudo}</p>
        <div class="botao-post-it">
            <button class="botao botao-editar" id="editar-${indice}">Editar</button>
            <button class="botao botao-cancelar" id="excluir-${indice}">Excluir</button>
        </div>
    </div>
    `

    local.innerHTML += lembreteMontado;
}

function atualizaLembretes(){
    
    const bancoDeDados = buscarDadosDoLocalStorage();

    document.querySelector(".container-cards").innerHTML = ""

    bancoDeDados.forEach((dado, indice) => mostrarCardNaTela(dado, indice));
}

function editarLembrete(){
    let mensagemEditada = document.querySelector("#mensagen-editada").value;
    let indice = indiceGlobal;
    editarDadosNoBancoDados(indice, mensagemEditada);
}

function carregaCampoEditarLembrete(indice){
    
    let localParaeditar = document.querySelector("#mensagen-editada");  

    let todosLembretes = buscarDadosDoLocalStorage();

    let textoParaEditar = todosLembretes[indice];

    localParaeditar.value = textoParaEditar;
    indiceGlobal = indice;
    
}

function editarExcluirLembrete(evento){
    
    let botao = evento.target.id.split("-");

    if(botao[0] == "editar"){

        carregaCampoEditarLembrete(botao[1]);

    }

    if(botao[0] == "excluir"){
        console.log("botao excluir")
        deletarDadosBancoDados(botao[1])
    }   
}

// Eventos

document.querySelector(".nav__botao-editar").addEventListener("click", ()=>{
    editarLembrete();
})

document.querySelector(".botao-cancelar").addEventListener("click" ,()=>{
    var campoInformacoes = document.querySelector("[data-mensagem]");
    campoInformacoes.value = ""

})

document.querySelector(".botao-salvar").addEventListener("click", ()=>{
    
    var campoInformacoes = document.querySelector("[data-mensagem]");
    var conteudo = campoInformacoes.value;
    
    if(conteudo.length > 0){
        
        salvarDados();
        
        mostrarCardNaTela(conteudo);
        campoInformacoes.value = ""

    }else{
        alert("Esqueceu de digitar o seu lembrete")
    }
});

document.querySelector(".container-cards")
.addEventListener("click", editarExcluirLembrete)

function adicionarEfeitoDeslizanteBotoes(){

    const botaoMenu = document.querySelectorAll('.botao-deslizante')
    const menu = document.querySelector('.menu-deslizante')

    botaoMenu.forEach(botao => {

        botao.addEventListener('click', () => {
        menu.classList.toggle('menu-deslizante--ativo')
        });
    });
}

function adicionarEfeitoBotaoEditar(){

    const botaoEditar = document.querySelectorAll(".botao-editar")
    const menuNav = document.querySelector('.nav-deslizante')

    botaoEditar.forEach(botao => {
        
        botao.addEventListener("click", ()=>{
    
            menuNav.classList.toggle('nav-deslizante--ativo');
        })
    })
    

}

atualizaLembretes();

adicionarEfeitoDeslizanteBotoes();

adicionarEfeitoBotaoEditar();


