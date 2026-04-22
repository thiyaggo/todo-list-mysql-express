import { mostrarErro, mostrarSucesso } from './alerts.js';
//envia os dados atraves do metodo post assim que clic no botao pro servidor

// messangem caso a pessoa tenha se cadastrado com sucesso
const parametros = new URLSearchParams(window.location.search);

        if (parametros.get('cadastro') === 'true') {
        // Opção A: Um alerta simples do navegador
            mostrarSucesso('Cadastrado com sucesso! ogora realize o longin');
            window.history.replaceState({}, document.title, window.location.pathname);    
        }
const form = document.querySelector('#form-login');//transforma o form em uma const form

form.onsubmit = async (e) => {//
    e.preventDefault(); // Impede a página de recarregar

    //serve pra pegar todos os dados e tranforma em um objeto
    const dados = new FormData(form);
    const corpo = Object.fromEntries(dados);

    const resposta = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        window.location.href = '/homelista.html?acesso=true'; // Redireciona via JS
        mostrarSucesso('Bem-vindo, ' + resultado.user.nome);
    } else {
        mostrarErro('Erro: senha incorreta');
    }
};

// mostrar senha
const inputSenha = document.getElementById('senha');
const checkbox = document.getElementById('verSenha');

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        inputSenha.type = 'text'; // mostra
    } else {
        inputSenha.type = 'password'; // esconde
    }
});

//mostrar menssagem depois de deslogar
  window.onload = () => {
    const parametros = new URLSearchParams(window.location.search);

    if (parametros.get('saiu') === 'true') {
        // Opção A: Um alerta simples do navegador
        // alert('Sessão encerrada com sucesso!');
        mostrarSucesso('Deslogado com sucesso!');    
    }
    window.history.replaceState({}, document.title, window.location.pathname);
};