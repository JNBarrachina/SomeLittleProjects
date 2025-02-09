let color = "yellow";
let turno;
let tiempo;
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
    mostrar_deshacer();
    resaltar_botonPrincipal(1);

    tableroCompleto++;

    if (tableroCompleto == 42) {
        empate();
    }

    jaque(1, c1fila);
}

function botonPrincipal() {
    if (tiempo != undefined) {
        // Cuando el botón es pulsado durante la partida
        ocultar_deshacer();
        resaltar_botonPrincipal(2);
        alertas();

        cambiar_color();
        guiar_color();
        reset_temporizador();
        temporizador();
    }

    if (document.getElementById("jugar").innerHTML == "¡JUGAR!") {
        // INICIAR PARTIDA
        player1 = prompt("¿Quién juega amarillo?", "Jugador 1");
        player2 = prompt("¿Quién juega rojo?", "Jugador 2");

        document.getElementById("p1").innerHTML = player1.toUpperCase();
        document.getElementById("p2").innerHTML = player2.toUpperCase();

        document.getElementById("jugador1").style.backgroundColor = "yellow";
        document.getElementById("jugador2").style.backgroundColor = "red";

        document.getElementById("fichero").style.borderColor = "yellow";

        temporizador();
    }

    if (document.getElementById("jugar").innerHTML == "¿Otra?") {
        // REINICIAR PARTIDA
        location.reload();
    }
}

function resaltar_botonPrincipal(bp) {
    if (bp == 1) {
        document.getElementById("jugar").style.padding = "1.4rem";
        document.getElementById("jugar").style.border = "6px solid #4843b7";
    } else if (bp == 2) {
        document.getElementById("jugar").style.padding = "1rem";
        document.getElementById("jugar").style.border = "2px solid #4843b7";
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

function retirada() {
    fichaCaida = document.getElementById(
        "fichac" + ficha_columna + "f" + ficha_fila
    );

    fichaCaida.disabled = true;

    fichaCaida.classList.add("retirada");

    setTimeout(() => {
        fichaCaida.classList.remove("retirada");
        fichaCaida.disabled = false;
    }, 1000);

    return false;
}

function cambiar_color() {
    if (color == "yellow") {
        color = "red";
    } else {
        color = "yellow";
    }
}

function guiar_color() {
    if (color == "yellow") {
        document.getElementById("fichero").style.borderColor = "yellow";
    } else if (color == "red") {
        document.getElementById("fichero").style.borderColor = "red";
    }
}

function mostrar_deshacer() {
    if (color == "yellow") {
        document.getElementById("deshacerp1").style.display = "block";
    } else if (color == "red") {
        document.getElementById("deshacerp2").style.display = "block";
    }
}

function ocultar_deshacer() {
    if (color == "yellow") {
        document.getElementById("deshacerp1").style.display = "none";
    }

    if (color == "red") {
        document.getElementById("deshacerp2").style.display = "none";
    }
}

function deshacer_jugada() {
    resaltar_botonPrincipal(2);

    if (ficha_columna !== null && ficha_fila !== null) {
        document.getElementById(
            "fichac" + ficha_columna + "f" + ficha_fila
        ).style.backgroundColor = "";

        switch (ficha_columna) {
            case 1:
                c1fila--;
                break;
            case 2:
                c2fila--;
                break;
            case 3:
                c3fila--;
                break;
            case 4:
                c4fila--;
                break;
            case 5:
                c5fila--;
                break;
            case 6:
                c6fila--;
                break;
            case 7:
                c7fila--;
                break;
        }

        retirada();
        ficha_columna = null;
        ficha_fila = null;
        tableroCompleto--;
    }

    ocultar_deshacer();
}

function reset_temporizador() {
    clearInterval(turno);
}

function temporizador() {
    tiempo = 10;

    document.getElementById("jugar").style.backgroundColor = color;
    document.getElementById("jugar").style.color = "black";
    document.getElementById("jugar").innerHTML = tiempo;

    turno = setInterval(function () {
        tiempo--;

        document.getElementById("jugar").innerHTML = tiempo;

        if (tiempo === 0) {
            ocultar_deshacer();
            alertas();
            resaltar_botonPrincipal(2);

            cambiar_color();
            guiar_color();
            document.getElementById("jugar").style.backgroundColor = color;
            tiempo = 11;
        }
    }, 1000);
}

function victoria() {
    ocultar_deshacer();
    reset_temporizador();
    tiempo = undefined;

    document.getElementById("jugar").innerHTML = "¿Otra?";
    document.getElementById("jugar").style.backgroundColor = "black";
    document.getElementById("jugar").style.color = "white";

    if (ficha_bucle == "yellow") {
        setTimeout(function () {
            document.getElementById("victoria").style.visibility = "visible";

            document.getElementById("victoria").innerHTML =
                " <span style='color: yellow;'>" +
                "Ganaste" +
                " " +
                document.getElementById("p1").innerHTML +
                "!!" +
                "</span>";
        }, 800);
    } else if (ficha_bucle == "red") {
        setTimeout(function () {
            document.getElementById("victoria").style.visibility = "visible";

            document.getElementById("victoria").innerHTML =
                " <span style='color: red;'>" +
                "Ganaste" +
                " " +
                document.getElementById("p2").innerHTML +
                "!!" +
                "</span>";
        }, 800);
    }
}

function empate() {
    ocultar_deshacer();
    reset_temporizador();
    tiempo = undefined;

    document.getElementById("jugar").innerHTML = "¿Otra?";
    document.getElementById("jugar").style.backgroundColor = "black";
    document.getElementById("jugar").style.color = "white";

    setTimeout(function () {
        document.getElementById("victoria").style.visibility = "visible";

        document.getElementById("victoria").innerHTML =
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
    jugar = document.getElementById("jugar");

    if (
        document.getElementById("jugar").innerHTML == "¡JUGAR!" ||
        document.getElementById("jugar").innerHTML == "¿Otra?"
    ) {
        jugar.disabled = true;

        jugar.classList.add("alerta");

        setTimeout(() => {
            jugar.classList.remove("alerta");
            jugar.disabled = false;
        }, 1000);

        return false;
    }

    if (document.getElementById("jugar").innerHTML == tiempo && tiempo === 0) {
        jugar.disabled = true;

        jugar.classList.add("alerta3");

        setTimeout(() => {
            jugar.classList.remove("alerta3");
            jugar.disabled = false;
        }, 1000);

        return true;
    }

    if (document.getElementById("jugar").innerHTML == tiempo) {
        jugar.disabled = true;

        jugar.classList.add("alerta2");

        setTimeout(() => {
            jugar.classList.remove("alerta2");
            jugar.disabled = false;
        }, 1000);

        return true;
    }
}
