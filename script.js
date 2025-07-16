const audio = document.getElementById("musica");
const playPauseBtn = document.querySelector(".playPauseBtn");

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
}

audio.addEventListener("ended", () => {
    playPauseBtn.textContent = "▶️";
});

let imagens = [
    "contents/img/roll1.png",
    "contents/img/roll2.png",
    "contents/img/roll3.png",
    "contents/img/roll4.png"
];

let indice = 0;

function atualizarImagem() {
    const img = document.getElementById("imagemCarrossel");
    const polaroid = document.querySelector(".polaroid");

    // Remove a classe que revela a imagem
    polaroid.classList.remove("revelado");

    // Atualiza a imagem
    img.src = imagens[indice];
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
