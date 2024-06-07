const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaInput = document.querySelector('#alternar-musica');
const musica = new Audio ('/sons/luna-rise-part-one.mp3');
const play = new Audio ('sons/play.wav');
const pause = new Audio ('sons/pause.mp3');
const beep = new Audio ('sons/beep.mp3');
const iniciaroOuPausarBt = document.querySelector('#start-pause span');
const pauseIcon = document.querySelector('.app__card-primary-butto-icon');
musica.loop = true 
let tempo = 1500;
let intervaloID = null;


musicaInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    }
    else{
        musica.pause()
    }
})


focoBt.addEventListener('click', () => {
    tempo = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () =>{
    tempo = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () =>{
    tempo = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});


function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })      
    
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
                titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
                titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.?<br>
            <strong class="app__title-strong">Faça uma pausa longa.!</strong>`
        default:
            break;
    }
}

const contagemRegressia = () => {
    if(tempo <= 0){
    beep.play()
    zerar()
    return
    }
    tempo -= 1
    mostrarTempo()

}

botaoIniciar.addEventListener('click', iniciaroOuPausar)

function iniciaroOuPausar() {
    if(intervaloID){
        pause.play()
        zerar()
        return
    }
    play.play();
    intervaloID = setInterval(contagemRegressia, 1000);
    iniciaroOuPausarBt.textContent = "Pausar";
    pauseIcon.setAttribute('src', `/imagens/pause.png`);
}

function zerar(){
    clearInterval(intervaloID)
    iniciaroOuPausarBt.textContent = "Começar"
    pauseIcon.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloID = null
}

function mostrarTempo(){
    const temporizador = new Date(tempo * 1000)
    const tempoFormatado = temporizador.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit' })
    displayTempo.innerHTML = `${tempoFormatado}` 
}

mostrarTempo()