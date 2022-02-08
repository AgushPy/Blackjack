//funcion anonima
const miModulo = (() => {

    'use strict'; //Le dice a js que lea el codigo de forma estricta, no permitir cosas fuera de los parametros estrictos


    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    
    
    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];
    //Referencias del HTML
    
    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener= document.querySelector('#btnDetener');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          modificaPuntos = document.querySelectorAll('small');
    
    

    //Esta funcion inicializa el juego.
   
    const inicializarJuego = ( numJugadores = 2) =>{
        deck = crearDeck();

        puntosJugadores = [];
        for(let i = 0; i<numJugadores;i++){
                puntosJugadores.push(0);
        }
    
        modificaPuntos.forEach(elem => elem.innerText = 0);      
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //Esta funcion crea una nueva baraja
    const crearDeck = () =>{
    


        deck = [];
        
        for( let i = 2 ; i <= 10 ; i++ ){
            for (let tipo of tipos){
                deck.push( i + tipo);
            }
        }
    
    
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
    
        // console.log(deck);
        return _.shuffle( deck );;
    }
    
    
 
    
    
    //Esta Funcion me permite tomar una carta
    
    const pedirCarta = () =>{
        if (deck.length === 0){
            throw 'No hay cartas en el deck'
        }
        
    //Tomara una carta y la sacara del "mazo"
        
        return deck.pop();
    }
    
    
        //pedirCarta();
    
    
    // const valorCarta = (carta) =>{
    
    //     const valor = carta.substring(0, carta.length - 1);
    //     let puntos = 0;
    //     // console.log({valor});
    //     // 2= 2,  10= 10
    
    //     if( isNaN(valor) ){
    //         console.log('No es un numero');
    
    //         puntos = (valor === 'A') ? 11: 10;
    //     } else{
    //         console.log('Es un numero');
    //         puntos = valor*1;
    //     }
    //     console.log(puntos);
    
    // }
    
    
    
    const valorCarta = (carta) =>{
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN( valor ))?
                (valor === 'A')? 11:10
                : valor*1;
    }
    
    // Turno : 0 = primer jugador, y el ultimo sera la compu
    
     const acumularPuntos= ( carta, turno ) =>{

         puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
         modificaPuntos[turno].innerHTML = puntosJugadores[turno];
         return puntosJugadores[turno];
     }


     const crearCarta = (carta,turno) =>{
        const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            // divCarasJugador.append()
            divCartasJugadores[turno].append(imgCarta);
     }


     //Este generara el resultado de la partida
     const determinarGanador = () => {
        
        const [ puntosMinimos, puntosComputadora ]= puntosJugadores;
        
        setTimeout(() => {
            if(puntosComputadora === puntosMinimos){
                alert('Nada gana :(');
            } else if (puntosMinimos > 21 ){
                alert('Computadora Gana');
            } else if( puntosComputadora > 21){
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );

     }
    
    //Turno compu
    //Jugador pierde o jugador se detiene.
    
    const turnoComputadora = ( puntosMinimos ) =>{
    
        let puntosComputadora= 0;
        do{
    
            const carta = pedirCarta();
 
            puntosComputadora = acumularPuntos(carta,puntosJugadores.length-1);
        
            crearCarta(carta, puntosJugadores.length-1);
           
   
   
        }while(  (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)   )
    
        determinarGanador();
        
    }
    
    
    //Eventos
    
    btnPedir.addEventListener('click', () => {
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);
        
        crearCarta(carta, 0);

      
        //hay que valuar puntos
    
        if(puntosJugador > 21 ){
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
            
        } else if (puntosJugador === 21){
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
            
        }
        
    
    })
    //Callback funcion que se manda como argumento.
    
    
    btnDetener.addEventListener('click', () => {
    
    
        btnPedir.disabled = true;
    
        btnDetener.disabled = true;
        console.warn('El jugador a pasado su turno, sigue la computadora');
    
    
        turnoComputadora(puntosJugadores[0]);
    
       
        
    })
    
    
    btnNuevo.addEventListener('click', () => {
    
        
        inicializarJuego();
        
    })


    return {
       nuevoJuego: inicializarJuego
    };


}) ();
