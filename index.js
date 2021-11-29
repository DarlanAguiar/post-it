
function adicionarEscuta(){

    const botaoMenu = document.querySelectorAll('.botao-deslizante')
    const menu = document.querySelector('.menu-deslizante')

    botaoMenu.forEach(botao => {

        botao.addEventListener('click', () => {
        menu.classList.toggle('menu-deslizante--ativo')
    });

    });
}

adicionarEscuta()