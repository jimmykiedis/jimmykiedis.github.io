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

    img.src = imagens[indice];
    polaroid.classList.remove("revelado");
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
