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

let imagens = [];
let indice = 0;

fetch("contents/assets/lista.json")
  .then(res => res.json())
  .then(dados => {
    imagens = dados;
    atualizarImagem(); // mostra a primeira imagem assim que carregar
  })
  .catch(err => {
    console.error("Erro ao carregar lista de imagens:", err);
  });

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
