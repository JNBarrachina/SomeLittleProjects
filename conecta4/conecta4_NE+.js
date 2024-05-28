
let color = "yellow"

let c1fila = 1; let c2fila = 1; let c3fila = 1
let c4fila = 1; let c5fila = 1; let c6fila = 1
let c7fila = 1

function jugada(columna) {

    if (document.getElementById("jugar").innerHTML == "¡JUGAR!") {
        alert("Pulsa el boton de JUGAR para comenzar.")
        return
    }

    else if (document.getElementById("jugar").innerHTML == "¿Otra partida?") {
        alert("¿Otra partida?")
        return
    }

    switch (columna) {
        case 1:
            document.getElementById("fichac"+columna+"f"+c1fila).style.backgroundColor = color;

            y = columna
            vvertical(y)

            x = c1fila
            vhorizontal(x)

            y = columna
            x = c1fila
            vdiagonal_descendente(y,x)

            y = columna
            x = c1fila
            vdiagonal_ascendente(y,x)

            c1fila++
            
            break
        case 2:
            document.getElementById("fichac"+columna+"f"+c2fila).style.backgroundColor = color;

            y = columna
            vvertical(y)

            x = c2fila
            vhorizontal(x)

            y = columna
            x = c2fila
            vdiagonal_descendente(y,x)

            y = columna
            x = c2fila
            vdiagonal_ascendente(y,x)

            c2fila++

            break
        case 3:
            document.getElementById("fichac"+columna+"f"+c3fila).style.backgroundColor = color;

            y = columna
            vvertical(y)

            x = c3fila
            vhorizontal(x)

            y = columna
            x = c3fila
            vdiagonal_descendente(y,x)

            y = columna
            x = c3fila
            vdiagonal_ascendente(y,x)
            
            c3fila++

            break
        case 4:
            document.getElementById("fichac"+columna+"f"+c4fila).style.backgroundColor = color;

            y = columna
            vvertical(y)

            x = c4fila
            vhorizontal(x)

            y = columna
            x = c4fila
            vdiagonal_descendente(y,x)

            y = columna
            x = c4fila
            vdiagonal_ascendente(y,x)

            c4fila++

            break
        case 5:
            document.getElementById("fichac"+columna+"f"+c5fila).style.backgroundColor = color; 

            y = columna
            vvertical(y)

            x = c5fila
            vhorizontal(x)

            y = columna
            x = c5fila
            vdiagonal_descendente(y,x)

            y = columna
            x = c5fila
            vdiagonal_ascendente(y,x)
            
            c5fila++

            break
        
        case 6:
            document.getElementById("fichac"+columna+"f"+c6fila).style.backgroundColor = color;

            y = columna
            vvertical(y)

            x = c6fila
            vhorizontal(x)

            y = columna
            x = c6fila
            vdiagonal_descendente(y,x)

            y = columna
            x = c6fila
            vdiagonal_ascendente(y,x)

            c6fila++

            break

        case 7:
            document.getElementById("fichac"+columna+"f"+c7fila).style.backgroundColor = color;

            y = columna
            vvertical(y)

            x = c7fila
            vhorizontal(x)

            y = columna
            x = c7fila
            vdiagonal_descendente(y,x)

            y = columna
            x = c7fila
            vdiagonal_ascendente(y,x)

            c7fila++

            break

    }

cambiar_color()

}

function cambiar_color() {
    if (color == "yellow") {
        color = "red"
    }
    else {
        color = "yellow"
    }
}

function jugar() {
    if (document.getElementById("jugador1").innerHTML != "PLAYER 1") {
        location.reload()
    }

    p1 = prompt("¿Quién juega amarillo?", "Jugador 1")
    p2 = prompt("¿Quién juega rojo?", "Jugador 2")

    document.getElementById("jugador1").innerHTML = p1.toUpperCase()
    document.getElementById("jugador2").innerHTML = p2.toUpperCase()
    document.getElementById("jugador1").style.backgroundColor = "yellow"
    document.getElementById("jugador2").style.backgroundColor = "red"
    document.getElementById("jugar").innerHTML = "¡VS!"
}

//Resaltado de la ficha que va a ser pintada, según la columna donde se encuentre el cursor.






function victoria() {
    if(ficha_bucle == "yellow") {
        alert("Ganaste" + " " + document.getElementById("jugador1").innerHTML + "!!")
    }

    else if (ficha_bucle == "red") {
        alert("Ganaste" + " " + document.getElementById("jugador2").innerHTML + "!!")
    }

    document.getElementById("jugar").innerHTML = "¿Otra partida?"

}


function vvertical() {
    contador = 1
        
    for (x=1; x<=5; x++) {
        ficha_bucle = document.getElementById("fichac"+y+"f"+x).style.backgroundColor

        if (ficha_bucle == "yellow" || ficha_bucle == "red") {

            if ((document.getElementById("fichac"+y+"f"+(x+1)).style.backgroundColor != ficha_bucle)) {

                contador = 1
            }

            else  {

                contador++
            }

            if (contador == 4) {
                victoria()
            }
        }

    }

}

function vhorizontal() {
    contador = 1

    for (y=1; y<=6; y++) {
        ficha_bucle = document.getElementById("fichac"+y+"f"+x).style.backgroundColor

        if (ficha_bucle == "yellow" || ficha_bucle == "red") {

            if ((document.getElementById("fichac"+(y+1)+"f"+x).style.backgroundColor != ficha_bucle)) {

                contador = 1
            }

            else  {

                contador++
            }

            if (contador == 4) {
                victoria()
            }
        }

    }
    
}

function vdiagonal_descendente() {

    // y = columna, x = c(y)fila

    //Excluimos las fichas que no pueden formar un conecta 4 con la diagonal

    if ((y<=3 && x == 1) || (x<=3 && y == 1) || (x == 2 && y == 2) ||  //Esquina inferior izquierda
        (y >= 5 && y == 6) || (x >= 4 && y == 7) || (x == 5 && y == 6)) {  //Esquina superior derecha

        return
    }

    // Creamos las variables de inicio y fin de la diagonal

        inicio_y = y 
        inicio_x = x
        fin_y = y
        fin_x = x

        while (inicio_y > 1 && inicio_x < 6) {  //Definimos las coordenadas del inicio de la diagonal
        inicio_y--
        inicio_x++
        }

        while (fin_y < 7 && fin_x > 1) {  //Definimos las coordenadas del final de la diagonal
        fin_y++
        fin_x--
        }

        x = inicio_x
        y = inicio_y
        contador = 1


        for (y=inicio_y; y<fin_y; y++) {    //Recorremos la diagonal en busca del conecta-4

            ficha_bucle = document.getElementById("fichac"+y+"f"+x).style.backgroundColor

            if (ficha_bucle == "yellow" || ficha_bucle == "red") {

                if ((document.getElementById("fichac"+(y+1)+"f"+(x-1)).style.backgroundColor != ficha_bucle)) {

                    contador = 1
                }

                else  {

                    contador++
                }

                if (contador == 4) {
                    victoria()
                }
            }

            if (x > fin_x) {
                x--
            }
        }

}


function vdiagonal_ascendente() {

    // y = columna, x = c(y)fila

    //Excluimos las fichas que no pueden formar un conecta 4 con la diagonal

    if ((y<=3 && x == 6) || (x>=4 && y == 1) || (x == 5 && y == 2) ||  //Esquina superior izquierda
        (y >= 5 && y == 1) || (x <= 3 && y == 7) || (x == 2 && y == 6)) {  //Esquina inferior derecha

        return
    }

    // Creamos las variables de inicio y fin de la diagonal

        inicio_y = y 
        inicio_x = x
        fin_y = y
        fin_x = x

        while (inicio_y > 1 && inicio_x > 1) {  //Definimos las coordenadas del inicio de la diagonal
        inicio_y--
        inicio_x--
        }

        while (fin_y < 7 && fin_x < 6) {  //Definimos las coordenadas del final de la diagonal
        fin_y++
        fin_x++
        }
        

        x = inicio_x
        y = inicio_y
        contador = 1

        for (y=inicio_y; y<fin_y; y++) {    //Recorremos la diagonal en busca del conecta-4

            ficha_bucle = document.getElementById("fichac"+y+"f"+x).style.backgroundColor

            if (ficha_bucle == "yellow" || ficha_bucle == "red") {

                if ((document.getElementById("fichac"+(y+1)+"f"+(x+1)).style.backgroundColor != ficha_bucle)) {

                contador = 1
                }

                else  {

                    contador++
                }

                if (contador == 4) {
                    victoria()
                }
            }

            if (x < fin_x) {
                x++
            }
        }

}
