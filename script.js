let imagens = [
    "contents/roll1.png",
    "contents/roll2.png",
    "contents/roll3.png",
    "contents/roll4.png"
];

let indice = 0;

function atualizarImagem() {
    const img = document.getElementById("imagemCarrossel");
    const polaroid = document.querySelector(".polaroid");

    // Remover classe "revelado" imediatamente
    polaroid.classList.remove("revelado");

    // Resetar o estilo de transição e filtro da imagem
    img.style.transition = "none";
    img.style.filter = "brightness(0)";

    // Atualiza a imagem
    img.src = imagens[indice];

    // Pequeno delay para reaplicar a transição
    setTimeout(() => {
        img.style.transition = "filter 2s ease";
    }, 30); // 30ms é o bastante pro navegador aplicar o filtro imediatamente
}

function avancarImagem() {
    indice = (indice + 1) % imagens.length;
    atualizarImagem();
}

function voltarImagem() {
    indice = (indice - 1 + imagens.length) % imagens.length;
    atualizarImagem();
}

function revelarImagem() {
    const polaroid = document.querySelector(".polaroid");
    polaroid.classList.add("revelado");
}
