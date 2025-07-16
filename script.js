let = Images = [
    "contents/roll1.png",
    "contents/roll2.png",
    "contents/roll3.png",
    "contents/roll4.png"
];

let indice = 0;

function atualizarImagem() {
    const img = document.getElementById('imagemCarrossel')
    const polaroid = document.querySelector('.polariod');

    img.src = Images[indice];
    polaroid.classList.remove('revelada');
}

function avancarImagem() {
    indice = (indice + 1) % Images.length;
    atualizarImagem();
}

function voltarImagem() {
    indice = (indice - 1 + Images.length) % Images.length;
    atualizarImagem();
}

function revelarImagem() {
    const polaroid = document.querySelector('.polariod');
    polaroid.classList.add('revelada');
}