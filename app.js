let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let mostrarMovimientos = document.getElementById('movimientos');
let aciertos = 0;
let mostrarAciertos = document.getElementById('aciertos');
let Temporizador = false;
let timer = 30;
let mostrarTiempo = document.getElementById('t-restante');
let tiempoRegresivo = null;
let timerInicial = 30;
let titulo = document.querySelector('.titulo');

let winaudio = new Audio('./sound/win.wav') 
let loseaudio = new Audio('./sound/lose.wav') 
let clickaudio = new Audio('./sound/click.wav') 
let wrongaudio = new Audio('./sound/wrong.wav') 
let rightaudio = new Audio('./sound/right.wav') 

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});


function destapar(id){
    if(Temporizador == false){
        contarTiempo();
        Temporizador = true
    }


    tarjetasDestapadas++;

    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png">`;
        clickaudio.play();

        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];   
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png">`;

        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            tarjetasDestapadas = 0 ;

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightaudio.play();

            if(aciertos == 8){
                winaudio.play();
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Eri gey?`
                mostrarTiempo.innerHTML = `Felicitaciones, tu tiempo fue: ${timerInicial - timer } segundos`
                mostrarMovimientos.innerHTML = `Pedro`
            }
        }else{
            wrongaudio.play();
            setTimeout(()=>{
                tarjeta1.innerHTML = ' '
                tarjeta2.innerHTML = ' '
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800)
        }
    }
}

function contarTiempo(){
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
            loseaudio.play();
            titulo.innerHTML = 'PERDISTE'
        }
    }, 1000);
}

function bloquearTarjetas(){
    for (let index = 0; index <= 15; index++) {
        let tarjetaBloqueada = document.getElementById(index);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[index]}.png">`;
        tarjetaBloqueada.disabled = true;
        
    }
}