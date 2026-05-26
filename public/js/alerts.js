// alerts.js
export function mostrarSucesso(texto) {
    criarAlerta(texto, '#1d944f', 'fa-circle-check');
}

export function mostrarErro(texto) {
    criarAlerta(texto, '#be3c2e', 'fa-circle-xmark');
}

export function mostrarAlert(texto) {
    criarAlerta(texto, '#a1a401', 'fa-circle-xmark');
}

function criarAlerta(texto, cor, icone) {
    const msg = document.createElement('div');
    msg.innerHTML = `<i class="fa-solid ${icone}"></i> ${texto}`;
    msg.style = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background: ${cor}; color: white; padding: 15px 30px;
        border-radius: 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 9999; font-family: sans-serif;
        display: flex; align-items: center; gap: 10px;
        transition: opacity 0.5s;
        font-size:16px;
        font-weight:600;
    `;
    document.body.appendChild(msg);
    setTimeout(() => {
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 500);
    }, 3000);
}

export default {mostrarErro, mostrarSucesso, mostrarAlert};
