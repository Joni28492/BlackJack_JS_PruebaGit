/**
 * 2C = Two of Clubs 
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two Swords
 */

 let deck         = [];
 const tipos      = ['C', 'D', 'H', 'S'];
 const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;
//referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevoJuego = document.querySelector('#btnNuevo');

const divCartasJugador      = document.querySelector('#jugador-cartas');
const divCartasComputadora  = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');
const divTitulo = document.querySelector('.titulo');

//esta funcion crea una nueva baraja
const crearDeck = () =>{
    
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i+tipo);
        }     
    }
    //cartas K J Q y As
    for (let tipo of tipos) {
        for (const esp of especiales) {
            deck.push(esp+tipo);
        }
    }

    //console.log(deck);//deck ordenado
    //shuffle() desordena un arreglo
    deck=_.shuffle(deck);
    //console.log(deck);
    return deck;
}

crearDeck();

//esta funcion me permite tomar una carta
const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el Deck';
    }
    const carta = deck.pop();//remueve el ultimo elemento
    return carta;
}


//pedirCarta();
const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length-1);
    return ( isNaN(valor)  ) ? 
           ( valor === 'A')  ? 11:10
           :valor*1;
}


// turno de la computadora,ptsminimos->ptJugador
const turnoComputadora = (puntosMinimos) =>{

    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);  

        if (puntosMinimos > 21) {
            break;
        }

    } while( (puntosComputadora<puntosMinimos) && (puntosMinimos<=21) );




    //mensaje de victoria

    setTimeout(() => {
        if(puntosComputadora === puntosMinimos){
            //alert('Nadei Gana :(');
            divTitulo.innerText='Nadie Gana';
        }else if(puntosMinimos > 21){
            //alert('Computadora Gana');
            divTitulo.innerText='Computadora Gana';
        }else if(puntosComputadora>21){
            //alert('Jugador Gana');
            divTitulo.innerText='Jugador Gana';
        }else{
            //alert('Computadora Gana');
            divTitulo.innerText='Computadora Gana';
        }

        
    }, 100);//100ms es suficiente



}



//Eventos
btnPedir.addEventListener('click',()=> {
    
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    
    // <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    //control puntaje
    if(puntosJugador >21){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled =true;
        turnoComputadora(puntosJugador);
    }else if( puntosJugador === 21){
        console.warn('21, Genial');
        btnDetener.disabled =true;
        turnoComputadora(puntosJugador);
    }

});

//logica btnDtener
btnDetener.addEventListener('click', () =>{
   
    btnPedir.disabled = true;
    btnDetener.disabled =true;
    turnoComputadora(puntosJugador);
   
});

//logica boton nuevo juego
btnNuevoJuego.addEventListener('click', ()=>{

    console.clear()//limpiamos la consola
    deck=[];
    deck = crearDeck();//barajamos
    puntosComputadora=0;
    puntosJugador    =0;

    puntosHTML[0].innerText=0;//puntajeJugador
    puntosHTML[1].innerText=0;//puntajeComputadora

    //borrar las cartas
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled=false;
    btnDetener.disabled=false;
    divTitulo.innerText='BlackJack';

});

