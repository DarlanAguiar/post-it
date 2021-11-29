
function buscarDoLocalStorage () {
    return JSON.parse(localStorage.getItem("dadosPostit")) ?? [];
}

function inserirNoLocalStorage (dados) {

    localStorage.setItem("dadosPostit", JSON.stringify(dados));
    
}

function editarDadosNoBancoDados(indice, novaAnotacao){
    let bancoDeDados = buscarDoLocalStorage();
    bancoDeDados[indice] = novaAnotacao;
    inserirNoLocalStorage(bancoDeDados);
}

function deletarDadosBancoDados(indice){
    let bancoDeDados = buscarDoLocalStorage();
    bancoDeDados.splice(indice, 1);
    inserirNoLocalStorage(bancoDeDados);

}

function salvarDados () {
    //pegando o texto digitado
    var campoInformacoes = document.querySelector("[data-mensagem]");
    var informacoes = campoInformacoes.value;
    
    let bancoDeDados = buscarDoLocalStorage()

    bancoDeDados.push(informacoes)

    inserirNoLocalStorage(bancoDeDados);
    
    
}

function mostrarCardNaTela(conteudo){

    let local = document.querySelector(".container-cards");

    let moldeCard = `
    <div class="post-it">
        <p class="texto">${conteudo}</p>
        <div class="botao-post-it">
            <button class="botao botao-editar">editar</button>
            <button class="botao botao-cancelar">apagar</button>
        </div>
    </div>
    `

    local.innerHTML += moldeCard;

}







// Eventos

document.querySelector(".botao-cancelar").addEventListener("click" ,()=>{
    var campoInformacoes = document.querySelector("[data-mensagem]");
    campoInformacoes.value = ""

})

document.querySelector(".botao-salvar").addEventListener("click", ()=>{
    
    var campoInformacoes = document.querySelector("[data-mensagem]");
    var conteudo = campoInformacoes.value;
    
    if(conteudo.length > 0){
        
        //salvarDados();
        
        mostrarCardNaTela(conteudo);
        campoInformacoes.value = ""

    }else{
        alert("Esqueceu de digitar o seu lembrete")
    }
    


});



function adicionarEfeitoDeslizanteBotoes(){

    const botaoMenu = document.querySelectorAll('.botao-deslizante')
    const menu = document.querySelector('.menu-deslizante')

    botaoMenu.forEach(botao => {

        botao.addEventListener('click', () => {
        menu.classList.toggle('menu-deslizante--ativo')
        });

    });
}

adicionarEfeitoDeslizanteBotoes();



