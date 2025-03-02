let color = "yellow";
let turno;
let tiempo;
let jugar = document.getElementById("jugar");
let fichero = document.getElementById("fichero");
let vic = document.getElementById("victoria");

let c1fila = 1,
    c2fila = 1,
    c3fila = 1,
    c4fila = 1,
    c5fila = 1,
    c6fila = 1,
    c7fila = 1;
let ficha_columna = null;
let ficha_fila = null;
let tableroCompleto = 0;

function jugada(columna) {
    if (!alertas()) {
        return;
    }

    switch (columna) {
        case 1:
            document.getElementById(
                "fichac" + columna + "f" + c1fila
            ).style.backgroundColor = color;

            ficha_columna = columna;
            ficha_fila = c1fila;

            y = columna;
            vvertical(y);

            x = c1fila;
            vhorizontal(x);

            y = columna;
            x = c1fila;
            vdiagonal_descendente(y, x);

            y = columna;
            x = c1fila;
            vdiagonal_ascendente(y, x);

            c1fila++;

            break;
        case 2:
            document.getElementById(
                "fichac" + columna + "f" + c2fila
            ).style.backgroundColor = color;

            ficha_columna = columna;
            ficha_fila = c2fila;

            y = columna;
            vvertical(y);

            x = c2fila;
            vhorizontal(x);

            y = columna;
            x = c2fila;
            vdiagonal_descendente(y, x);

            y = columna;
            x = c2fila;
            vdiagonal_ascendente(y, x);

            c2fila++;

            break;
        case 3:
            document.getElementById(
                "fichac" + columna + "f" + c3fila
            ).style.backgroundColor = color;

            ficha_columna = columna;
            ficha_fila = c3fila;

            y = columna;
            vvertical(y);

            x = c3fila;
            vhorizontal(x);

            y = columna;
            x = c3fila;
            vdiagonal_descendente(y, x);

            y = columna;
            x = c3fila;
            vdiagonal_ascendente(y, x);

            c3fila++;

            break;
        case 4:
            document.getElementById(
                "fichac" + columna + "f" + c4fila
            ).style.backgroundColor = color;

            ficha_columna = columna;
            ficha_fila = c4fila;

            y = columna;
            vvertical(y);

            x = c4fila;
            vhorizontal(x);

            y = columna;
            x = c4fila;
            vdiagonal_descendente(y, x);

            y = columna;
            x = c4fila;
            vdiagonal_ascendente(y, x);

            c4fila++;

            break;
        case 5:
            document.getElementById(
                "fichac" + columna + "f" + c5fila
            ).style.backgroundColor = color;

            ficha_columna = columna;
            ficha_fila = c5fila;

            y = columna;
            vvertical(y);

            x = c5fila;
            vhorizontal(x);

            y = columna;
            x = c5fila;
            vdiagonal_descendente(y, x);

            y = columna;
            x = c5fila;
            vdiagonal_ascendente(y, x);

            c5fila++;

            break;

        case 6:
            document.getElementById(
                "fichac" + columna + "f" + c6fila
            ).style.backgroundColor = color;

            ficha_columna = columna;
            ficha_fila = c6fila;

            y = columna;
            vvertical(y);

            x = c6fila;
            vhorizontal(x);

            y = columna;
            x = c6fila;
            vdiagonal_descendente(y, x);

            y = columna;
            x = c6fila;
            vdiagonal_ascendente(y, x);

            c6fila++;

            break;

        case 7:
            document.getElementById(
                "fichac" + columna + "f" + c7fila
            ).style.backgroundColor = color;

            ficha_columna = columna;
            ficha_fila = c7fila;

            y = columna;
            vvertical(y);

            x = c7fila;
            vhorizontal(x);

            y = columna;
            x = c7fila;
            vdiagonal_descendente(y, x);

            y = columna;
            x = c7fila;
            vdiagonal_ascendente(y, x);

            c7fila++;

            break;
    }

    caida();

    tableroCompleto++;

    if (tableroCompleto == 42) {
        empate();
    }

    cambiar_color();
    reset_temporizador();
    temporizador();
}

function botonPrincipal() {
    if (tiempo != undefined) {
        alertas();  
    }

    if (jugar.innerText == "¡JUGAR!") {
        // INICIAR PARTIDA
        player1 = prompt("¿Quién juega amarillo?", "Jugador 1");
        player2 = prompt("¿Quién juega rojo?", "Jugador 2");

        document.getElementById("p1").innerHTML = player1.toUpperCase();
        document.getElementById("p2").innerHTML = player2.toUpperCase();

        document.getElementById("jugador1").style.border = "2px yellow solid";
        document.getElementById("jugador2").style.border = "2px red solid";

        fichero.style.borderColor = "yellow";

        temporizador();
    }

    if (jugar.innerText == "¿Otra?") {
        // REINICIAR PARTIDA
        location.reload();
    }
}

function resaltar_ficha() {
    const columnas = document.querySelectorAll(".columnas");

    columnas.forEach((columna) => {
        columna.addEventListener("mouseover", () => {
            let ficha = 1;
            let columnaID = columna.id.replace("columna", "");
            let fichaEncontrada = false;

            while (ficha <= 6 && !fichaEncontrada) {
                let fichita = document.getElementById(
                    "fichac" + columnaID + "f" + ficha
                );

                if (fichita.style.backgroundColor == "") {
                    fichita.classList.add("resaltado");
                    fichaEncontrada = true;
                }

                ficha++;
            }
        });

        columna.addEventListener("mouseout", () => {
            let columnaID = columna.id.replace("columna", "");
            for (let i = 1; i <= 6; i++) {
                let fichaElement = document.getElementById(
                    "fichac" + columnaID + "f" + i
                );
                fichaElement.classList.remove("resaltado");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", resaltar_ficha);

function caida() {
    fichaCaida = document.getElementById(
        "fichac" + ficha_columna + "f" + ficha_fila
    );

    fichaCaida.disabled = true;

    fichaCaida.classList.add("caida");

    setTimeout(() => {
        fichaCaida.classList.remove("caida");
        fichaCaida.disabled = false;
    }, 500);

    return false;
}

function cambiar_color() {
    if (color == "yellow") {
        color = "red";
        jugar.style.backgroundColor = "red";
        fichero.style.borderColor = "red";
    } else {
        color = "yellow";
        jugar.style.backgroundColor = "yellow";
        fichero.style.borderColor = "yellow";
    }
}

function reset_temporizador() {
    clearInterval(turno);
}

function temporizador() {
    tiempo = 10;

    jugar.style.backgroundColor = color;
    jugar.style.color = "black";
    jugar.innerText = tiempo;

    turno = setInterval(function () {
        tiempo--;

        jugar.innerText = tiempo;

        if (tiempo === 0) {
            alertas();

            cambiar_color();
            jugar.style.backgroundColor = color;
            tiempo = 11;
        }
    }, 1000);
}

function victoria() {
    tiempo = undefined;

    jugar.innerText = "¿Otra?";
    jugar.style.backgroundColor = "black";
    jugar.style.color = "white";

    if (ficha_bucle == "yellow") {
        setTimeout(function () {
            vic.style.visibility = "visible";

            vic.innerHTML =
                " <span style='color: yellow;'>" +
                "Ganaste" +
                " " +
                document.getElementById("p1").innerHTML +
                "!!" +
                "</span>";
        }, 1000);
    } else if (ficha_bucle == "red") {
        setTimeout(function () {
            document.getElementById("victoria").style.visibility = "visible";

            vic.innerHTML =
                " <span style='color: red;'>" +
                "Ganaste" +
                " " +
                document.getElementById("p2").innerHTML +
                "!!" +
                "</span>";
        }, 1000);
    }
}

function empate() {
    tiempo = undefined;

    jugar.innerText = "¿Otra?";
    jugar.style.backgroundColor = "black";
    jugar.style.color = "white";

    setTimeout(function () {
        vic.style.visibility = "visible";

        vic.innerHTML =
            " <span style='color: black;'>" +
            "EMPATE TÉCNICO. BIEN JUGADO..." +
            "</span>";
    }, 800);
}

function vvertical() {
    contador = 1;

    for (x = 1; x <= 5; x++) {
        ficha_bucle = document.getElementById("fichac" + y + "f" + x).style
            .backgroundColor;

        if (ficha_bucle == "yellow" || ficha_bucle == "red") {
            if (
                document.getElementById("fichac" + y + "f" + (x + 1)).style
                    .backgroundColor != ficha_bucle
            ) {
                contador = 1;
            } else {
                contador++;
            }

            if (contador == 4) {
                victoria();
            }
        }
    }
}

function vhorizontal() {
    contador = 1;

    for (y = 1; y <= 6; y++) {
        ficha_bucle = document.getElementById("fichac" + y + "f" + x).style
            .backgroundColor;

        if (ficha_bucle == "yellow" || ficha_bucle == "red") {
            if (
                document.getElementById("fichac" + (y + 1) + "f" + x).style
                    .backgroundColor != ficha_bucle
            ) {
                contador = 1;
            } else {
                contador++;
            }

            if (contador == 4) {
                victoria();
            }
        }
    }
}

function vdiagonal_descendente() {
    // y = columna, x = c(y)fila

    //Excluimos las fichas que no pueden formar un conecta 4 con la diagonal

    if (
        (y <= 3 && x == 1) ||
        (x <= 3 && y == 1) ||
        (x == 2 && y == 2) || //Esquina inferior izquierda
        (y >= 5 && y == 6) ||
        (x >= 4 && y == 7) ||
        (x == 5 && y == 6)
    ) {
        //Esquina superior derecha

        return;
    }

    // Creamos las variables de inicio y fin de la diagonal

    inicio_y = y;
    inicio_x = x;
    fin_y = y;
    fin_x = x;

    while (inicio_y > 1 && inicio_x < 6) {
        //Definimos las coordenadas del inicio de la diagonal
        inicio_y--;
        inicio_x++;
    }

    while (fin_y < 7 && fin_x > 1) {
        //Definimos las coordenadas del final de la diagonal
        fin_y++;
        fin_x--;
    }

    x = inicio_x;
    y = inicio_y;
    contador = 1;

    for (y = inicio_y; y < fin_y; y++) {
        //Recorremos la diagonal en busca del conecta-4

        ficha_bucle = document.getElementById("fichac" + y + "f" + x).style
            .backgroundColor;

        if (ficha_bucle == "yellow" || ficha_bucle == "red") {
            if (
                document.getElementById("fichac" + (y + 1) + "f" + (x - 1))
                    .style.backgroundColor != ficha_bucle
            ) {
                contador = 1;
            } else {
                contador++;
            }

            if (contador == 4) {
                victoria();
            }
        }

        if (x > fin_x) {
            x--;
        }
    }
}

function vdiagonal_ascendente() {
    // y = columna, x = c(y)fila

    //Excluimos las fichas que no pueden formar un conecta 4 con la diagonal

    if (
        (y <= 3 && x == 6) ||
        (x >= 4 && y == 1) ||
        (x == 5 && y == 2) || //Esquina superior izquierda
        (y >= 5 && y == 1) ||
        (x <= 3 && y == 7) ||
        (x == 2 && y == 6)
    ) {
        //Esquina inferior derecha

        return;
    }

    // Creamos las variables de inicio y fin de la diagonal

    inicio_y = y;
    inicio_x = x;
    fin_y = y;
    fin_x = x;

    while (inicio_y > 1 && inicio_x > 1) {
        //Definimos las coordenadas del inicio de la diagonal
        inicio_y--;
        inicio_x--;
    }

    while (fin_y < 7 && fin_x < 6) {
        //Definimos las coordenadas del final de la diagonal
        fin_y++;
        fin_x++;
    }

    x = inicio_x;
    y = inicio_y;
    contador = 1;

    for (y = inicio_y; y < fin_y; y++) {
        //Recorremos la diagonal en busca del conecta-4

        ficha_bucle = document.getElementById("fichac" + y + "f" + x).style
            .backgroundColor;

        if (ficha_bucle == "yellow" || ficha_bucle == "red") {
            if (
                document.getElementById("fichac" + (y + 1) + "f" + (x + 1))
                    .style.backgroundColor != ficha_bucle
            ) {
                contador = 1;
            } else {
                contador++;
            }

            if (contador == 4) {
                victoria();
            }
        }

        if (x < fin_x) {
            x++;
        }
    }
}

function alertas() {
    if (
        jugar.innerText == "¡JUGAR!" ||
        jugar.innerText == "¿Otra?"
    ) {
        jugar.disabled = true;

        jugar.classList.add("alerta");

        setTimeout(() => {
            jugar.classList.remove("alerta");
            jugar.disabled = false;
        }, 1000);

        return false;
    }

    if (jugar.innerHTML == tiempo && tiempo === 0) {
        jugar.disabled = true;

        jugar.classList.add("alerta3");

        setTimeout(() => {
            jugar.classList.remove("alerta3");
            jugar.disabled = false;
        }, 1000);

        return true;
    }

    if (jugar.innerHTML == tiempo) {
        jugar.disabled = true;

        jugar.classList.add("alerta2");

        setTimeout(() => {
            jugar.classList.remove("alerta2");
            jugar.disabled = false;
        }, 1000);

        return true;
    }
}
