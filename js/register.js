// funções botão visibilidade da senha
function olhoAtual() {
    const olho = document.getElementById("olho");
    const visivel = "url(\"./assets/icons8-visível-24.png\")";
    const invisivel = "url(\"./assets/icons8-invisível-24.png\")";

    const imagemAtual = olho.style.backgroundImage;

    if (imagemAtual === invisivel) {
        olho.style.backgroundImage = visivel;
    } else {
        olho.style.backgroundImage = invisivel;
    }

    mudarVisibilidade();
}

function mudarVisibilidade() {
    const senha = document.getElementById("senha");
    senha.type = senha.type === "password" ? "text" : "password";
}

function olhoAtual1() {
    const olho = document.getElementById("olho1");
    const visivel = "url(\"./assets/icons8-visível-24.png\")";
    const invisivel = "url(\"./assets/icons8-invisível-24.png\")";

    const imagemAtual = olho.style.backgroundImage;

    if (imagemAtual === invisivel) {
        olho.style.backgroundImage = visivel;
    } else {
        olho.style.backgroundImage = invisivel;
    }

    mudarVisibilidade1();
}

function mudarVisibilidade1() {
    const senha = document.getElementById("senha1");
    senha.type = senha.type === "password" ? "text" : "password";
}

// ==============

