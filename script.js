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

// Depois que você carregar a lista (ex: do JSON):
let imagens = [];    // Sua lista com nomes corretos, cria uma lista de imagens
let indice = 0;         //inicializa a o indicie 0 na lista de imagens

// Na inicialização
document.getElementById("imagemCarrossel").src = imagens[indice];

fetch("contents/assets/lista.json")     // abre a lista em json criada pelo script python
  .then(res => res.json())              // aqui a gente converte o json em um objeto javascript
  .then(dados => {                      // atribui o objeto javascript a variável da lista de imagens
    imagens = dados;
    atualizarImagem(); // mostra a primeira imagem assim que carregar
  })
  .catch(err => {                       // se der erro, avisa no console
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
