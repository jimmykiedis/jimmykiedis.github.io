const audio = document.getElementById("musica");    // obtém do html um elemento com id "musica"
const playPauseBtn = document.querySelector(".playPauseBtn");   // obtém do html um elemento com a classe "playPauseBtn"
const polaroid = document.querySelector(".polaroid");
let startX = 0;
let startY = 0;
let textos = []; // cria a lista para armazenar as legendas
let imagens = []; // cria a lista para armazenar as imagens
let indice = 0;   // cria um índice para controlar a imagem e o texto atual

function criarCoraçao() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 10 + 10 + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000); // remove após cair
}




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
    const point = e.type.includes("touch") ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
}

function onEnd(e) {
    const point = e.type.includes("touch") ? e.changedTouches[0] : e;
    const deltaX = point.clientX - startX;
    const deltaY = startY - point.clientY;

    // Prioriza o movimento mais dominante (horizontal ou vertical)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > 50) {
            deltaX > 0 ? voltarImagem() : avancarImagem();
        }
    } else {
        if (Math.abs(deltaY) > 50) {
            if (deltaY > 0) {
                // Arrastou pra cima → virar para o verso (texto)
                polaroid.classList.add("virada");
            } else {
                // Arrastou pra baixo → voltar à imagem
                polaroid.classList.remove("virada");
            }
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
// Gera um novo coração a cada 300ms
setInterval(criarCoraçao, 300);