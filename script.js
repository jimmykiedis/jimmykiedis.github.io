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

let textos = []; // Lista para armazenar as legendas
let imagens = []; // Lista para armazenar as imagens
let indice = 0;   // Índice atual

function carregarTexto() {
    return fetch('contents/src/text.txt')
        .then(res => res.text())
        .then(texto => {
            textos = texto.split(/\r?\n---\r?\n/).map(l => l.trim());
        })
        .catch(err => {
            console.error("Erro ao carregar o texto: ", err);
        });
}

function atualizarTexto() {
    const textDiv = document.getElementById("texto");
    textDiv.textContent = textos[indice] || '';
}

function atualizarImagem() {
    const img = document.getElementById("imagemCarrossel");
    const polaroid = document.querySelector(".polaroid");

    polaroid.classList.remove("revelado");
    img.src = imagens[indice];
    atualizarTexto();
}

// Inicialização: carregar imagens e textos antes de mostrar qualquer coisa
Promise.all([
    fetch("contents/assets/lista.json").then(res => res.json()).then(dados => imagens = dados),
    carregarTexto()
]).then(() => {
    atualizarImagem();
}).catch(err => {
    console.error("Erro ao carregar arquivos:", err);
});


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
