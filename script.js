const audio = document.getElementById("musica");    // obtém do html um elemento com id "musica"
const playPauseBtn = document.querySelector(".playPauseBtn");   // obtém do html um elemento com a classe "playPauseBtn"
const polaroid = document.querySelector(".polaroid");
let startX = 0;
let textos = []; // cria a lista para armazenar as legendas
let imagens = []; // cria a lista para armazenar as imagens
let indice = 0;   // cria um índice para controlar a imagem e o texto atual

// trata a criação do vetor de textos, que são separados por "---" no arquivo text.txt
function carregarTexto() {
    return fetch('contents/src/text.txt')   // busca em contents/src o arquivo text.txt
        .then(res => res.text())            // retonar a resposta do fetch e converte ela pra texto
        .then(texto => {
            textos = texto.split(/\r?\n---\r?\n/).map(l => l.trim());   // o vetor de textos recebe cada texto separado por "---" e remove os espaços em branco no início e no final de cada texto
        })
        .catch(err => {
            console.error("Erro ao carregar o texto: ", err);       // exibe no console caso ocorra algum erro
        });
}

// busca-se um elemento no html com a id "texto" e atualiza o texto do elemento com o texto correspondente ao índice atual
function atualizarTexto() {
    const textDiv = document.getElementById("texto");   // textDiv recebe o elemento com a id "texto"
    textDiv.textContent = textos[indice] || '';         // atualiza o texto do elemento com o texto correspondente ao índice atual, ou uma string vazia se não houver texto
}

// busca-se um elemento no html com a id "fotosPolaroid" e atualiza o src da imagem com a imagem correspondente ao índice atual
function atualizarImagem() {
    const img = document.getElementById("fotosPolaroid");   // id "fotosPolaroid" é colocado em img
    img.src = imagens[indice];                              // o src da imagem é atualizada com o vetor de imagens com o indice atual
    atualizarTexto();                                       //chama a função de atualizar o texto    
}

// busca-se um elemento no html com classe "polaroid" e adiciona a classe css revelado nesse elemento
function revelarImagem() {
    polaroid.classList.add("revelado");
}

function avancarImagem() {
    indice = (indice + 1) % imagens.length;
    polaroid.classList.remove("revelado"); // remove a revelação
    void polaroid.offsetWidth; // força reflow (reset da animação)
    atualizarImagem();
}

function voltarImagem() {
    indice = (indice - 1 + imagens.length) % imagens.length;
    polaroid.classList.remove("revelado");
    void polaroid.offsetWidth;
    atualizarImagem();
}

// controla qual o botão aparece se a musica estiver tocando ou pausada
function toggleMusic() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
}

// adiciona um evento que muda o botão de pause para play quando a música é acaba
audio.addEventListener("ended", () => {
    playPauseBtn.textContent = "▶️";
});

// inicio do toque ou clique
function onStart(e) {
    startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX; // obtém a posição inicial do toque ou clique
}

function onEnd(e) {
    const endX = e.type.includes("touch") ? e.changedTouches[0].clientX : e.clientX; // obtém a posição final do toque ou clique
    const deltaX = endX - startX; // calcula a diferença entre a posição final e inicial

    if (Math.abs(deltaX) > 50) { // se a diferença for maior que 50 pixels
        if (deltaX > 0) {
            voltarImagem(); // se a diferença for positiva, volta a imagem
        }
        else {
            avancarImagem(); // se a diferença for negativa, avança a imagem
        }
    }
}

// Inicialização: carregar imagens e textos antes de mostrar qualquer coisa
Promise.all([
    fetch("contents/assets/lista.json").then(res => res.json()).then(dados => imagens = dados), // carrega a lista de imagens da lista.json
    carregarTexto()     // carrega o texto do arquivo text.txt
]).then(() => {
    atualizarImagem();  // só então ele atualiza a imagem e o texto
}).catch(err => {
    console.error("Erro ao carregar arquivos:", err);       // caso ocorra algum erro, exibe no console
});

// Adiciona os eventos de toque e clique para avançar e voltar as imagens
polaroid.addEventListener("mousedown", onStart);
polaroid.addEventListener("mouseup", onEnd);
polaroid.addEventListener("touchstart", onStart);
polaroid.addEventListener("touchend", onEnd);