document.addEventListener('DOMContentLoaded', function () {

    /* Declaracion de variables */
    const cartas = document.querySelectorAll('.carta');
    let yaClickeo = false;
    let bloquear = false;
    let seleccion1 = '';
    let seleccion2 = '';
    let movimientos = 0;
    let correctas = 0;
    const contadorCorrectas = document.querySelector('.contadorCorrectas');


    /* Declaracion de funciones */

    (function ordenarCartas() {
        cartas.forEach(function (carta) {
            numero = Math.floor(Math.random() * 24);
            carta.style.order = numero;
        })
    })();
    /* Los parentesis antes y despues de la declaracion de la funcion son para que se ejecute inmediatamente */
    /* Math.random() da un numero random entre 0 y 1, lo multiplico por 24 y Math.floor() lo convierte en entero */
    /* order es la propiedad de css que funciona con grid */

    function pareja() {

        seleccion1.removeEventListener('click', flip);
        seleccion2.removeEventListener('click', flip);
        seleccion1 = '';
        seleccion2 = '';
    }

    function noPareja() {

        seleccion1.classList.remove('flip');
        seleccion2.classList.remove('flip');
        seleccion1 = '';
        seleccion2 = '';
        bloquear = false;
        let numero = '';
    }

    function imprimirMovimientos() {

        movimientos += 1;
        const contadorMovimientos = document.querySelector('.contadorMovimientos');
        contadorMovimientos.innerHTML = '<p>Cantidad de movimientos: </p>' + '<p>' + movimientos + '</p>';
    }

    function sacarTrue() {
        contadorCorrectas.classList.remove('true');
    }

    function imprimirCorrectas() {

        correctas += 1
        contadorCorrectas.innerHTML = '<p>Correctas: </p>' + '<p>' + correctas + '/' + cartas.length / 2 + '</p>';
        contadorCorrectas.classList.add('true');
        setTimeout(sacarTrue, 500);
    }



    function final() {
        let cartasFlip = document.querySelectorAll('.flip');

        if (cartasFlip.length === cartas.length) {
            const fin = document.querySelector('#final');
            const finCantidadMovimientos = document.querySelector('#cantidadMovimientos');
            finCantidadMovimientos.insertAdjacentText('afterbegin', 'Necesitaste' + ' ' + movimientos + ' ' + 'movimientos para completar el juego');
            fin.classList.remove('oculto');
        }
    }

    function flip() {

        if (bloquear === false) {

            this.classList.add('flip');

            if (!yaClickeo) {
                /* Primer click */
                seleccion1 = this;
                yaClickeo = true;
            } else if (this !== seleccion1) /* Que no se pueda comparar consigo misma */ {
                /* Segundo click */
                seleccion2 = this;
                yaClickeo = false;
                imprimirMovimientos();
            }

            if (seleccion1.classList[1] === seleccion2.classList[1]) {
                pareja();
                imprimirCorrectas();

            } else {
                bloquear = true;
                setTimeout(noPareja, 1000);
            }

            final();


        }

    }

    cartas.forEach(function (carta) {
        carta.addEventListener('click', flip)
    })

})


